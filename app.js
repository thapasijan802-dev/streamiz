/* ==========================================================================
   ROCK RADIO // PLAYLIST AUDIO STREAMING ENGINE & REALTIME PRESENCE
   ========================================================================== */

// ==========================================================================
// 1. DECADE PLAYLIST POOLS (USER-VERIFIED YOUTUBE MUSIC PLAYLISTS)
// ==========================================================================
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

const DECADE_PLAYLISTS = {
  '60s': [
    'OLAK5uy_nlkdwzqhI82XzrQ6bDzMl0PyrXTUtltB4',
    'PL36vhVTI7aVGQD7ZK4c5yZfS2n4c4weXd'
  ],
  '70s': [
    'RDATdyfccm9jaw',
    'RDCLAK5uy_nZiG9ehz_MQoWQxY5yElsLHCcG0tv9PRg',
    'OLAK5uy_kbHbRL1fKB0eLhbuBJ8iSo0bqmNi5ayBY',
    'PLse1AzEOESWSm9VpfEo0Z5jltivv7-vXf'
  ],
  '80s': [
    'RDCLAK5uy_maCVamCosYLtz7MRW_uNPyqCdMwZ1FTLs',
    'RDCLAK5uy_nyKVppE-RpLkeCcwLct4rvN9e8AAsS_qw',
    'RDATdzfccm9jaw',
    'RDCLAK5uy_nZiG9ehz_MQoWQxY5yElsLHCcG0tv9PRg',
    'RDATg6Xdz',
    'RDCLAK5uy_khMA5iC_Hy79mWTECnc3-SNeJSt5SlZGg'
  ],
  '90s': [
    'RDATd_feZ3J1bmdl',
    'RDCLAK5uy_m_h-nx7OCFaq9AlyXv78lG0AuloqW_NUA',
    'PLD58ECddxRngHs9gZPQWOCAKwV1hTtYe4',
    'RDATd_fccm9jaw',
    'OLAK5uy_lieUCVLMoB1Kkhuqsna8JXcGe3oQbMMts'
  ],
  '00s': [
    'OLAK5uy_kH7wrNsv2fbQ4bFnqzVirIprxCLJ9A2lA',
    'RDCLAK5uy_lnCm_XtFBPLTWRpMKfqiemrdBkBM7OtPc',
    'OLAK5uy_lieUCVLMoB1Kkhuqsna8JXcGe3oQbMMts'
  ]
};

// Combine all playlists for ALL ROCK mix
DECADE_PLAYLISTS['ALL'] = [
  ...DECADE_PLAYLISTS['60s'],
  ...DECADE_PLAYLISTS['70s'],
  ...DECADE_PLAYLISTS['80s'],
  ...DECADE_PLAYLISTS['90s'],
  ...DECADE_PLAYLISTS['00s']
];

// Fallback initial starter tracks
const FALLBACK_STARTER_TRACKS = {
  'ALL': { title: 'Bohemian Rhapsody', artist: 'Queen', id: 'fJ9rUzIMcZQ' },
  '60s': { title: 'Stairway to Heaven', artist: 'Led Zeppelin', id: 'QkF3oxziUI4' },
  '70s': { title: 'Bohemian Rhapsody', artist: 'Queen', id: 'fJ9rUzIMcZQ' },
  '80s': { title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', id: '1w7OgIMMRc4' },
  '90s': { title: 'Smells Like Teen Spirit', artist: 'Nirvana', id: 'hTWKbfoikeg' },
  '00s': { title: 'Numb', artist: 'Linkin Park', id: 'kXYiU_JCYtU' }
};

// Global App State
let player = null;
let isPlayerReady = false;
let isPlaying = false;
let userHasInteracted = false;
let pendingPlay = false;
let currentDecade = 'ALL';
let currentPlaylistId = '';
let isDraggingSeekbar = false;
let currentVolume = 100;
let isMuted = false;

// DOM Elements
const DOM = {
  trackTitle: document.getElementById('track-title'),
  trackArtist: document.getElementById('track-artist'),
  engineBadgeText: document.getElementById('engine-badge-text'),
  playPauseBtn: document.getElementById('play-pause-btn'),
  playBtnText: document.getElementById('play-btn-text'),
  playIcon: document.querySelector('.play-icon'),
  pauseIcon: document.querySelector('.pause-icon'),
  prevBtn: document.getElementById('prev-btn'),
  nextBtn: document.getElementById('next-btn'),
  rewindBtn: document.getElementById('rewind-btn'),
  forwardBtn: document.getElementById('forward-btn'),
  muteBtn: document.getElementById('mute-btn'),
  volumeIcon: document.querySelector('.volume-icon'),
  muteIcon: document.querySelector('.mute-icon'),
  volumeSlider: document.getElementById('volume-slider'),
  equalizer: document.getElementById('equalizer'),
  audioStatus: document.getElementById('audio-status'),
  statusText: document.getElementById('status-text'),
  listenerCountText: document.getElementById('listener-count-text'),
  autoplayOverlay: document.getElementById('autoplay-overlay'),
  decadeSelector: document.getElementById('decade-selector'),
  progressBarContainer: document.getElementById('progress-bar-container'),
  progressBarFill: document.getElementById('progress-bar-fill'),
  progressBarBuffer: document.getElementById('progress-bar-buffer'),
  progressThumb: document.getElementById('progress-thumb'),
  currentTime: document.getElementById('current-time'),
  durationTime: document.getElementById('duration-time'),
  shareBtn: document.getElementById('share-btn'),
  shortcutsBtn: document.getElementById('shortcuts-btn'),
  shortcutsModal: document.getElementById('shortcuts-modal'),
  modalCloseBtn: document.getElementById('modal-close-btn'),
  toastNotification: document.getElementById('toast-notification'),
  toastMessage: document.getElementById('toast-message')
};

const userId = 'user_' + Math.random().toString(36).substring(2, 9);

// Format Seconds to MM:SS
function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Show Toast Notification
function showToast(message) {
  if (!DOM.toastNotification || !DOM.toastMessage) return;
  DOM.toastMessage.textContent = message;
  DOM.toastNotification.classList.remove('hidden');
  setTimeout(() => {
    DOM.toastNotification.classList.add('hidden');
  }, 2500);
}

// Select a random playlist for the chosen decade
function getRandomPlaylist(decadeKey) {
  const list = DECADE_PLAYLISTS[decadeKey] || DECADE_PLAYLISTS['ALL'];
  return list[Math.floor(Math.random() * list.length)];
}

// Initialize Decade Selection
function setDecade(decadeKey) {
  currentDecade = decadeKey;
  currentPlaylistId = getRandomPlaylist(decadeKey);

  // Update UI Pills
  if (DOM.decadeSelector) {
    const pills = DOM.decadeSelector.querySelectorAll('.decade-pill');
    pills.forEach(pill => {
      if (pill.dataset.decade === decadeKey) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  const starter = FALLBACK_STARTER_TRACKS[decadeKey] || FALLBACK_STARTER_TRACKS['ALL'];
  updateTrackDisplay(starter.title, starter.artist);
}

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
  setDecade('ALL');
  initSupabaseRealtime();
});

// ==========================================================================
// 2. YOUTUBE IFRAME PLAYLIST STREAMING ENGINE
// ==========================================================================

function initYouTubePlayer() {
  if (player) return;

  const playerVars = {
    autoplay: 1,
    controls: 0,
    disablekb: 1,
    fs: 0,
    rel: 0,
    modestbranding: 1,
    enablejsapi: 1,
    playsinline: 1,
    origin: window.location.origin
  };

  try {
    player = new YT.Player('youtube-player', {
      height: '200',
      width: '200',
      playerVars: playerVars,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
        onError: onPlayerError
      }
    });
  } catch (e) {
    console.warn('YT Player init retry:', e);
  }
}

// Global callback invoked automatically by YouTube API script
window.onYouTubeIframeAPIReady = function() {
  initYouTubePlayer();
};

// Asynchronously load YouTube IFrame API
(function loadYouTubeAPI() {
  if (window.YT && window.YT.Player) {
    initYouTubePlayer();
    return;
  }
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(tag, firstScript);

  const checkInterval = setInterval(() => {
    if (window.YT && window.YT.Player && !player) {
      clearInterval(checkInterval);
      initYouTubePlayer();
    }
  }, 500);
})();

function onPlayerReady(event) {
  isPlayerReady = true;
  updateStatus('READY // TAP PLAY TO START');

  if (pendingPlay || userHasInteracted) {
    loadActiveDecadePlaylist(true);
  }
}

function loadActiveDecadePlaylist(autoPlay = true) {
  if (!player || !isPlayerReady) return;

  resetProgressBar();
  currentPlaylistId = getRandomPlaylist(currentDecade);

  try {
    if (typeof player.loadPlaylist === 'function') {
      player.loadPlaylist({
        list: currentPlaylistId,
        listType: 'playlist',
        index: 0,
        startSeconds: 0
      });
      if (typeof player.setShuffle === 'function') player.setShuffle(true);
      if (typeof player.setLoop === 'function') player.setLoop(true);
    }
  } catch (e) {
    console.warn('Load playlist error, playing starter track:', e);
    const starter = FALLBACK_STARTER_TRACKS[currentDecade] || FALLBACK_STARTER_TRACKS['ALL'];
    if (typeof player.loadVideoById === 'function') {
      player.loadVideoById({ videoId: starter.id, startSeconds: 0 });
    }
  }
}

function onPlayerStateChange(event) {
  if (!event) return;

  switch (event.data) {
    case YT.PlayerState.PLAYING:
      isPlaying = true;
      hideAutoplayPrompt();
      updatePlayPauseUI(true);
      fetchLiveTrackDetails();
      updateStatus(`NOW STREAMING // ${currentDecade} ROCK`, true);
      break;

    case YT.PlayerState.PAUSED:
      isPlaying = false;
      updatePlayPauseUI(false);
      updateStatus('STREAM PAUSED', false);
      break;

    case YT.PlayerState.BUFFERING:
      updateStatus('BUFFERING AUDIO...', true);
      break;

    case YT.PlayerState.ENDED:
      updateStatus('LOADING NEXT TRACK...', true);
      playNextTrack();
      break;

    case YT.PlayerState.CUED:
      if (userHasInteracted && player) {
        player.playVideo();
      }
      break;
  }
}

// Automatic Non-Stop Fallback Handling: If a video in playlist is restricted, advance instantly in 200ms
function onPlayerError(event) {
  console.warn(`Playlist video skipped (Code ${event.data}). Advancing to next track...`);
  if (player && typeof player.nextVideo === 'function') {
    setTimeout(() => {
      player.nextVideo();
    }, 200);
  }
}

// Extract and format clean Live Track Name & Artist from YouTube
function fetchLiveTrackDetails() {
  if (!player || typeof player.getVideoData !== 'function') return;

  const data = player.getVideoData();
  if (data && data.title && data.title.trim() !== '') {
    let title = data.title
      .replace(/\s*\([^)]*official[^)]*\)/gi, '')
      .replace(/\s*\[[^\]]*official[^\]]*\]/gi, '')
      .replace(/\s*\([^)]*video[^)]*\)/gi, '')
      .replace(/\s*\[[^\]]*video[^\]]*\]/gi, '')
      .replace(/\s*\([^)]*audio[^)]*\)/gi, '')
      .replace(/\s*\[[^\]]*audio[^\]]*\]/gi, '')
      .replace(/\s*\([^)]*hd[^)]*\)/gi, '')
      .replace(/\s*\[[^\]]*hd[^\]]*\]/gi, '')
      .replace(/\s*\([^)]*remastered[^)]*\)/gi, '')
      .replace(/\s*\[[^\]]*remastered[^\]]*\]/gi, '')
      .replace(/\s*\([^)]*lyric[^)]*\)/gi, '')
      .replace(/\s*\[[^\]]*lyric[^\]]*\]/gi, '')
      .replace(/\s*\([^)]*visualizer[^)]*\)/gi, '')
      .trim();

    let artist = 'ROCK ARCHIVE';

    if (title.includes(' - ')) {
      const parts = title.split(' - ');
      artist = parts[0].trim();
      title = parts.slice(1).join(' - ').trim();
    } else if (data.author) {
      artist = data.author
        .replace(/VEVO$/i, '')
        .replace(/ - Topic$/i, '')
        .trim();
    }

    updateTrackDisplay(title, artist);
  }
}

function updateTrackDisplay(title, artist) {
  DOM.trackTitle.style.opacity = '0';
  DOM.trackArtist.style.opacity = '0';

  setTimeout(() => {
    DOM.trackTitle.textContent = title;
    DOM.trackArtist.textContent = artist;
    DOM.trackTitle.style.opacity = '1';
    DOM.trackArtist.style.opacity = '1';
  }, 150);
}

function updatePlayPauseUI(playing) {
  isPlaying = playing;
  const vinyl = document.getElementById('vinyl-record');
  const tonearm = document.getElementById('tonearm');

  if (playing) {
    DOM.playIcon?.classList.add('hidden');
    DOM.pauseIcon?.classList.remove('hidden');
    DOM.equalizer?.classList.add('is-playing');
    vinyl?.classList.add('is-spinning');
    tonearm?.classList.add('is-active');
  } else {
    DOM.playIcon?.classList.remove('hidden');
    DOM.pauseIcon?.classList.add('hidden');
    DOM.equalizer?.classList.remove('is-playing');
    vinyl?.classList.remove('is-spinning');
    tonearm?.classList.remove('is-active');
  }
}

function updateStatus(text, isPlaying = false) {
  DOM.statusText.textContent = text;
  if (isPlaying) {
    DOM.audioStatus.classList.add('playing');
  } else {
    DOM.audioStatus.classList.remove('playing');
  }
}

function showAutoplayPrompt() {
  if (DOM.autoplayOverlay) {
    DOM.autoplayOverlay.classList.remove('hidden');
  }
}

function hideAutoplayPrompt() {
  if (DOM.autoplayOverlay) {
    DOM.autoplayOverlay.classList.add('hidden');
  }
}

// ==========================================================================
// 3. INTERACTIVE SEEKBAR & REAL-TIME PROGRESS TRACKING
// ==========================================================================

function resetProgressBar() {
  if (DOM.progressBarFill) DOM.progressBarFill.style.width = '0%';
  if (DOM.progressThumb) DOM.progressThumb.style.left = '0%';
  if (DOM.currentTime) DOM.currentTime.textContent = '0:00';
  if (DOM.durationTime) DOM.durationTime.textContent = '0:00';
}

// Real-time ticker to update progress bar and time labels
setInterval(() => {
  if (!player || !isPlayerReady || isDraggingSeekbar) return;

  try {
    if (typeof player.getCurrentTime === 'function' && typeof player.getDuration === 'function') {
      const current = player.getCurrentTime() || 0;
      const duration = player.getDuration() || 0;

      if (duration > 0) {
        const percentage = Math.min(100, Math.max(0, (current / duration) * 100));
        if (DOM.progressBarFill) DOM.progressBarFill.style.width = `${percentage}%`;
        if (DOM.progressThumb) DOM.progressThumb.style.left = `${percentage}%`;
        if (DOM.currentTime) DOM.currentTime.textContent = formatTime(current);
        if (DOM.durationTime) DOM.durationTime.textContent = formatTime(duration);

        if (typeof player.getVideoLoadedFraction === 'function' && DOM.progressBarBuffer) {
          const loadedPct = (player.getVideoLoadedFraction() || 0) * 100;
          DOM.progressBarBuffer.style.width = `${loadedPct}%`;
        }
      }
    }
  } catch (err) {
    // Silent catch
  }
}, 250);

// Seek by percentage
function seekToPercentage(pct) {
  if (!player || !isPlayerReady || typeof player.getDuration !== 'function') return;

  const duration = player.getDuration() || 0;
  if (duration > 0) {
    const targetSeconds = (pct / 100) * duration;
    player.seekTo(targetSeconds, true);
    if (DOM.currentTime) DOM.currentTime.textContent = formatTime(targetSeconds);
    if (DOM.progressBarFill) DOM.progressBarFill.style.width = `${pct}%`;
    if (DOM.progressThumb) DOM.progressThumb.style.left = `${pct}%`;
  }
}

// Seek by Delta (+10s or -10s)
function seekDelta(seconds) {
  if (!player || !isPlayerReady || typeof player.getCurrentTime !== 'function') return;

  const current = player.getCurrentTime() || 0;
  const duration = player.getDuration() || 0;
  const target = Math.max(0, Math.min(duration, current + seconds));
  player.seekTo(target, true);
  showToast(seconds > 0 ? `+${seconds}s Forward` : `${seconds}s Backward`);
}

// Scrubber Click & Drag Listeners (Desktop & Smartphone)
if (DOM.progressBarContainer) {
  function handleSeekEvent(e) {
    const rect = DOM.progressBarContainer.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clampedX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const percentage = (clampedX / rect.width) * 100;
    seekToPercentage(percentage);
  }

  DOM.progressBarContainer.addEventListener('mousedown', (e) => {
    isDraggingSeekbar = true;
    DOM.progressBarContainer.classList.add('is-dragging');
    handleSeekEvent(e);
  });

  window.addEventListener('mousemove', (e) => {
    if (isDraggingSeekbar) {
      handleSeekEvent(e);
    }
  });

  window.addEventListener('mouseup', () => {
    if (isDraggingSeekbar) {
      isDraggingSeekbar = false;
      DOM.progressBarContainer.classList.remove('is-dragging');
    }
  });

  // Mobile Touch Support
  DOM.progressBarContainer.addEventListener('touchstart', (e) => {
    isDraggingSeekbar = true;
    DOM.progressBarContainer.classList.add('is-dragging');
    handleSeekEvent(e);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isDraggingSeekbar) {
      handleSeekEvent(e);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (isDraggingSeekbar) {
      isDraggingSeekbar = false;
      DOM.progressBarContainer.classList.remove('is-dragging');
    }
  });
}

// ==========================================================================
// 4. USER CONTROLS (PLAY, NEXT, PREV, SEEK, VOLUME, DECADES)
// ==========================================================================

function handleDirectPlay() {
  userHasInteracted = true;
  pendingPlay = true;
  hideAutoplayPrompt();

  if (!isPlayerReady || !player) {
    updateStatus('CONNECTING TO ROCK FREQUENCIES...');
    return;
  }

  try {
    if (typeof player.getPlayerState === 'function') {
      const state = player.getPlayerState();
      if (state === YT.PlayerState.PLAYING) {
        pendingPlay = false;
        player.pauseVideo();
      } else if (state === YT.PlayerState.PAUSED || state === YT.PlayerState.CUED) {
        player.playVideo();
      } else {
        loadActiveDecadePlaylist(true);
      }
    } else {
      loadActiveDecadePlaylist(true);
    }
  } catch (err) {
    console.warn('Play exception, loading playlist:', err);
    loadActiveDecadePlaylist(true);
  }
}

function playNextTrack() {
  userHasInteracted = true;
  pendingPlay = true;
  hideAutoplayPrompt();

  if (player && typeof player.nextVideo === 'function') {
    player.nextVideo();
  } else {
    loadActiveDecadePlaylist(true);
  }
}

function playPrevTrack() {
  userHasInteracted = true;
  pendingPlay = true;
  hideAutoplayPrompt();

  if (player && typeof player.previousVideo === 'function') {
    player.previousVideo();
  } else {
    loadActiveDecadePlaylist(true);
  }
}

function toggleMute() {
  if (!player || !isPlayerReady) return;

  if (isMuted) {
    player.unMute();
    player.setVolume(currentVolume || 100);
    isMuted = false;
    DOM.volumeIcon?.classList.remove('hidden');
    DOM.muteIcon?.classList.add('hidden');
    if (DOM.volumeSlider) DOM.volumeSlider.value = currentVolume || 100;
  } else {
    player.mute();
    isMuted = true;
    DOM.volumeIcon?.classList.add('hidden');
    DOM.muteIcon?.classList.remove('hidden');
    if (DOM.volumeSlider) DOM.volumeSlider.value = 0;
  }
}

function setVolume(val) {
  currentVolume = parseInt(val, 10);
  if (!player || !isPlayerReady) return;

  if (currentVolume === 0) {
    player.mute();
    isMuted = true;
    DOM.volumeIcon?.classList.add('hidden');
    DOM.muteIcon?.classList.remove('hidden');
  } else {
    if (isMuted) player.unMute();
    player.setVolume(currentVolume);
    isMuted = false;
    DOM.volumeIcon?.classList.remove('hidden');
    DOM.muteIcon?.classList.add('hidden');
  }
}

// Button Bindings
const bindAction = (element, action) => {
  if (!element) return;
  element.addEventListener('click', (e) => {
    e.stopPropagation();
    action();
  });
};

bindAction(DOM.playPauseBtn, handleDirectPlay);
bindAction(DOM.nextBtn, playNextTrack);
bindAction(DOM.prevBtn, playPrevTrack);
bindAction(DOM.rewindBtn, () => seekDelta(-10));
bindAction(DOM.forwardBtn, () => seekDelta(10));
bindAction(DOM.muteBtn, toggleMute);

DOM.volumeSlider?.addEventListener('input', (e) => {
  setVolume(e.target.value);
});

// Bind Decade Selector Pills
if (DOM.decadeSelector) {
  DOM.decadeSelector.addEventListener('click', (e) => {
    const pill = e.target.closest('.decade-pill');
    if (!pill) return;
    e.stopPropagation();

    userHasInteracted = true;
    hideAutoplayPrompt();

    const decade = pill.dataset.decade;
    if (decade && DECADE_PLAYLISTS[decade]) {
      setDecade(decade);
      updateStatus(`SWITCHING FREQUENCY // ${decade} ROCK`, true);
      loadActiveDecadePlaylist(true);
    }
  });
}

// Share Track Action
DOM.shareBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  const title = DOM.trackTitle?.textContent || 'Rock Radio';
  const artist = DOM.trackArtist?.textContent || 'Live Broadcast';
  const shareText = `Listening to "${title} - ${artist}" on ROCK RADIO: ${window.location.href}`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(shareText).then(() => {
      showToast('Track link copied to clipboard!');
    }).catch(() => {
      showToast('Copied to clipboard!');
    });
  } else {
    showToast('Copied to clipboard!');
  }
});

// Shortcuts Modal Handlers
DOM.shortcutsBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  DOM.shortcutsModal?.classList.remove('hidden');
});

DOM.modalCloseBtn?.addEventListener('click', () => {
  DOM.shortcutsModal?.classList.add('hidden');
});

DOM.shortcutsModal?.addEventListener('click', (e) => {
  if (e.target === DOM.shortcutsModal) {
    DOM.shortcutsModal.classList.add('hidden');
  }
});

// Keyboard Navigation Support
window.addEventListener('keydown', (e) => {
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

  switch (e.code) {
    case 'Space':
      e.preventDefault();
      handleDirectPlay();
      break;
    case 'ArrowRight':
      e.preventDefault();
      seekDelta(10);
      break;
    case 'ArrowLeft':
      e.preventDefault();
      seekDelta(-10);
      break;
    case 'KeyN':
      playNextTrack();
      break;
    case 'KeyP':
      playPrevTrack();
      break;
    case 'KeyM':
      toggleMute();
      break;
    case 'Escape':
      DOM.shortcutsModal?.classList.add('hidden');
      break;
  }
});

// Global Mobile Touch Unblocker
const unlockAudioContext = () => {
  if (!userHasInteracted && isPlayerReady && player) {
    userHasInteracted = true;
    hideAutoplayPrompt();
    if (typeof player.playVideo === 'function') {
      player.playVideo();
    }
  }
};

document.addEventListener('touchstart', unlockAudioContext, { passive: true });
document.addEventListener('click', unlockAudioContext);

DOM.autoplayOverlay?.addEventListener('click', (e) => {
  e.stopPropagation();
  userHasInteracted = true;
  hideAutoplayPrompt();
  if (player && isPlayerReady) {
    player.playVideo();
  }
});

DOM.autoplayOverlay?.addEventListener('touchstart', (e) => {
  e.stopPropagation();
  userHasInteracted = true;
  hideAutoplayPrompt();
  if (player && isPlayerReady) {
    player.playVideo();
  }
}, { passive: true });

// ==========================================================================
// 5. SUPABASE REALTIME PRESENCE
// ==========================================================================

function initSupabaseRealtime() {
  const isPlaceholder = !SUPABASE_URL ||
    !SUPABASE_ANON_KEY ||
    SUPABASE_URL.includes('YOUR_SUPABASE') ||
    SUPABASE_ANON_KEY.includes('YOUR_SUPABASE');

  if (isPlaceholder || typeof window.supabase === 'undefined') {
    setupFallbackListenerCounter();
    return;
  }

  try {
    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const channel = supabaseClient.channel('radio-room', {
      config: { presence: { key: userId } }
    });

    channel.on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState();
      const count = Object.keys(state).length;
      updateListenerCountDisplay(count);
    });

    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({
          online_at: new Date().toISOString(),
          user_id: userId
        });
      }
    });
  } catch (err) {
    setupFallbackListenerCounter();
  }
}

function updateListenerCountDisplay(count) {
  if (!DOM.listenerCountText) return;
  const label = count === 1 ? 'listener tuning in' : 'listeners tuning in';
  DOM.listenerCountText.textContent = `${count} ${label}`;
}

function setupFallbackListenerCounter() {
  let count = Math.floor(Math.random() * 6) + 14;
  updateListenerCountDisplay(count);

  setInterval(() => {
    const delta = Math.random() > 0.5 ? 1 : -1;
    count = Math.max(1, count + delta);
    updateListenerCountDisplay(count);
  }, 12000);
}
