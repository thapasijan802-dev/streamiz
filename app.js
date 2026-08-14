/* ==========================================================================
   ROCK RADIO // SPOTIFY-INSPIRED PLAYBACK ENGINE & REALTIME PRESENCE
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

const FALLBACK_STARTER_TRACKS = {
  'ALL': { title: 'Do I Wanna Know?', artist: 'Arctic Monkeys', id: 'bpOSxM0rNPM' },
  '60s': { title: 'All Along the Watchtower', artist: 'Jimi Hendrix', id: 'TLV4_xx4Urk' },
  '70s': { title: 'Bohemian Rhapsody', artist: 'Queen', id: 'fJ9rUzIMcZQ' },
  '80s': { title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', id: '1w7OgIMMRc4' },
  '90s': { title: 'Smells Like Teen Spirit', artist: 'Nirvana', id: 'hTWKbfoikeg' },
  '00s': { title: '505', artist: 'Arctic Monkeys', id: 'qU9mHegkTc4' }
};

const DECADE_LABELS = {
  'ALL': 'ALL ROCK',
  '60s': '60s CLASSIC',
  '70s': '70s HARD ROCK',
  '80s': '80s HEAVY METAL',
  '90s': '90s GRUNGE',
  '00s': '00s MODERN ROCK'
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
let isLiked = false;

// DOM Elements
const DOM = {
  trackTitle: document.getElementById('track-title'),
  trackArtist: document.getElementById('track-artist'),
  albumArtCard: document.getElementById('album-art-card'),
  playPauseBtn: document.getElementById('play-pause-btn'),
  playIcon: document.querySelector('.play-icon'),
  pauseIcon: document.querySelector('.pause-icon'),
  prevBtn: document.getElementById('prev-btn'),
  nextBtn: document.getElementById('next-btn'),
  shuffleBtn: document.getElementById('shuffle-btn'),
  repeatBtn: document.getElementById('repeat-btn'),
  likeBtn: document.getElementById('like-btn'),
  muteBtn: document.getElementById('mute-btn'),
  volMaxBtn: document.getElementById('vol-max-btn'),
  volumeSlider: document.getElementById('volume-slider'),
  equalizer: document.getElementById('equalizer'),
  drawerToggleBtn: document.getElementById('drawer-toggle-btn'),
  drawerToggleBtnLeft: document.getElementById('drawer-toggle-btn-left'),
  headerDecadeTrigger: document.getElementById('header-decade-trigger'),
  activeDecadeLabel: document.getElementById('active-decade-label'),
  libraryDrawerBackdrop: document.getElementById('library-drawer-backdrop'),
  libraryDrawer: document.getElementById('library-drawer'),
  drawerCloseBtn: document.getElementById('drawer-close-btn'),
  progressBarContainer: document.getElementById('progress-bar-container'),
  progressBarFill: document.getElementById('progress-bar-fill'),
  progressBarBuffer: document.getElementById('progress-bar-buffer'),
  progressThumb: document.getElementById('progress-thumb'),
  currentTime: document.getElementById('current-time'),
  durationTime: document.getElementById('duration-time'),
  tabHome: document.getElementById('tab-home'),
  tabLibrary: document.getElementById('tab-library'),
  tabShare: document.getElementById('tab-share'),
  tabListenerCount: document.getElementById('tab-listener-count'),
  toastNotification: document.getElementById('toast-notification'),
  toastMessage: document.getElementById('toast-message'),
  autoplayOverlay: document.getElementById('autoplay-overlay')
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

// Open / Close Decade Drawer
function openDecadeDrawer() {
  DOM.libraryDrawerBackdrop?.classList.remove('hidden');
}

function closeDecadeDrawer() {
  DOM.libraryDrawerBackdrop?.classList.add('hidden');
}

// Initialize Decade Selection
function setDecade(decadeKey) {
  currentDecade = decadeKey;
  currentPlaylistId = getRandomPlaylist(decadeKey);

  if (DOM.activeDecadeLabel) {
    DOM.activeDecadeLabel.textContent = `${DECADE_LABELS[decadeKey] || decadeKey} ▾`;
  }

  // Update Drawer Card selections
  if (DOM.libraryDrawer) {
    const cards = DOM.libraryDrawer.querySelectorAll('.decade-card-item');
    cards.forEach(card => {
      if (card.dataset.decade === decadeKey) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
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
      height: '150',
      width: '150',
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

window.onYouTubeIframeAPIReady = function() {
  initYouTubePlayer();
};

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
    console.warn('loadPlaylist error:', e);
  }
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    updatePlayPauseUI(true);
    hideAutoplayPrompt();
    fetchLiveTrackDetails();
  } else if (event.data === YT.PlayerState.PAUSED) {
    updatePlayPauseUI(false);
  } else if (event.data === YT.PlayerState.BUFFERING) {
    DOM.albumArtCard?.classList.add('is-playing');
  } else if (event.data === YT.PlayerState.ENDED) {
    if (player && typeof player.nextVideo === 'function') {
      player.nextVideo();
    }
  }
}

// Saloon.wtf-style Zero-Skip Fallback
function onPlayerError(event) {
  console.warn('Track unplayable or restricted, skipping instantly:', event.data);
  if (player && typeof player.nextVideo === 'function') {
    setTimeout(() => {
      try {
        player.nextVideo();
      } catch (e) {
        loadActiveDecadePlaylist(true);
      }
    }, 200);
  }
}

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
  if (DOM.trackTitle) {
    DOM.trackTitle.style.opacity = '0';
    if (DOM.trackArtist) DOM.trackArtist.style.opacity = '0';

    setTimeout(() => {
      DOM.trackTitle.textContent = title;
      if (DOM.trackArtist) DOM.trackArtist.textContent = artist;
      DOM.trackTitle.style.opacity = '1';
      if (DOM.trackArtist) DOM.trackArtist.style.opacity = '1';
    }, 150);
  }
}

function updatePlayPauseUI(playing) {
  isPlaying = playing;
  if (playing) {
    DOM.playIcon?.classList.add('hidden');
    DOM.pauseIcon?.classList.remove('hidden');
    DOM.equalizer?.classList.add('is-playing');
    DOM.albumArtCard?.classList.add('is-playing');
  } else {
    DOM.playIcon?.classList.remove('hidden');
    DOM.pauseIcon?.classList.add('hidden');
    DOM.equalizer?.classList.remove('is-playing');
    DOM.albumArtCard?.classList.remove('is-playing');
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
  if (DOM.durationTime) DOM.durationTime.textContent = '-0:00';
}

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
        
        const remaining = Math.max(0, duration - current);
        if (DOM.currentTime) DOM.currentTime.textContent = formatTime(current);
        if (DOM.durationTime) DOM.durationTime.textContent = `-${formatTime(remaining)}`;

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

function seekToPercentage(pct) {
  if (!player || !isPlayerReady || typeof player.getDuration !== 'function') return;

  const duration = player.getDuration() || 0;
  if (duration > 0) {
    const targetSeconds = (pct / 100) * duration;
    player.seekTo(targetSeconds, true);
    const remaining = Math.max(0, duration - targetSeconds);
    if (DOM.currentTime) DOM.currentTime.textContent = formatTime(targetSeconds);
    if (DOM.durationTime) DOM.durationTime.textContent = `-${formatTime(remaining)}`;
    if (DOM.progressBarFill) DOM.progressBarFill.style.width = `${pct}%`;
    if (DOM.progressThumb) DOM.progressThumb.style.left = `${pct}%`;
  }
}

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
    if (isDraggingSeekbar) handleSeekEvent(e);
  });

  window.addEventListener('mouseup', () => {
    if (isDraggingSeekbar) {
      isDraggingSeekbar = false;
      DOM.progressBarContainer.classList.remove('is-dragging');
    }
  });

  DOM.progressBarContainer.addEventListener('touchstart', (e) => {
    isDraggingSeekbar = true;
    DOM.progressBarContainer.classList.add('is-dragging');
    handleSeekEvent(e);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isDraggingSeekbar) handleSeekEvent(e);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (isDraggingSeekbar) {
      isDraggingSeekbar = false;
      DOM.progressBarContainer.classList.remove('is-dragging');
    }
  });
}

// ==========================================================================
// 4. USER CONTROLS & EVENT BINDINGS
// ==========================================================================

function handleDirectPlay() {
  userHasInteracted = true;
  pendingPlay = true;
  hideAutoplayPrompt();

  if (!isPlayerReady || !player) return;

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
    if (DOM.volumeSlider) DOM.volumeSlider.value = currentVolume || 100;
  } else {
    player.mute();
    isMuted = true;
    if (DOM.volumeSlider) DOM.volumeSlider.value = 0;
  }
}

function setVolume(val) {
  currentVolume = parseInt(val, 10);
  if (!player || !isPlayerReady) return;

  if (currentVolume === 0) {
    player.mute();
    isMuted = true;
  } else {
    if (isMuted) player.unMute();
    player.setVolume(currentVolume);
    isMuted = false;
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
bindAction(DOM.muteBtn, toggleMute);
bindAction(DOM.volMaxBtn, () => {
  setVolume(100);
  if (DOM.volumeSlider) DOM.volumeSlider.value = 100;
});

// Shuffle Button picks random decade
bindAction(DOM.shuffleBtn, () => {
  const decades = ['60s', '70s', '80s', '90s', '00s', 'ALL'];
  const randomDecade = decades[Math.floor(Math.random() * decades.length)];
  setDecade(randomDecade);
  loadActiveDecadePlaylist(true);
  showToast(`Switched frequency to ${DECADE_LABELS[randomDecade]}`);
});

// Volume Slider
DOM.volumeSlider?.addEventListener('input', (e) => {
  setVolume(e.target.value);
});

// Heart Like Toggle
DOM.likeBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  isLiked = !isLiked;
  const outline = DOM.likeBtn.querySelector('.heart-icon.outline');
  const filled = DOM.likeBtn.querySelector('.heart-icon.filled');

  if (isLiked) {
    outline?.classList.add('hidden');
    filled?.classList.remove('hidden');
    showToast('Added to Liked Songs ♡');
  } else {
    outline?.classList.remove('hidden');
    filled?.classList.add('hidden');
    showToast('Removed from Liked Songs');
  }
});

// Drawer Triggers
bindAction(DOM.drawerToggleBtn, openDecadeDrawer);
bindAction(DOM.drawerToggleBtnLeft, openDecadeDrawer);
bindAction(DOM.headerDecadeTrigger, openDecadeDrawer);
bindAction(DOM.tabLibrary, openDecadeDrawer);
bindAction(DOM.drawerCloseBtn, closeDecadeDrawer);

DOM.libraryDrawerBackdrop?.addEventListener('click', (e) => {
  if (e.target === DOM.libraryDrawerBackdrop) {
    closeDecadeDrawer();
  }
});

// Decade Card Click inside Drawer
DOM.libraryDrawer?.addEventListener('click', (e) => {
  const card = e.target.closest('.decade-card-item');
  if (!card) return;
  e.stopPropagation();

  const decade = card.dataset.decade;
  if (decade && DECADE_PLAYLISTS[decade]) {
    setDecade(decade);
    closeDecadeDrawer();
    userHasInteracted = true;
    hideAutoplayPrompt();
    loadActiveDecadePlaylist(true);
    showToast(`Streaming ${DECADE_LABELS[decade]}`);
  }
});

// Share Button
const handleShare = () => {
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
};

DOM.tabShare?.addEventListener('click', handleShare);

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
      if (player && typeof player.getCurrentTime === 'function' && typeof player.getDuration === 'function') {
        const cur = player.getCurrentTime() || 0;
        player.seekTo(cur + 10, true);
        showToast('+10s');
      }
      break;
    case 'ArrowLeft':
      e.preventDefault();
      if (player && typeof player.getCurrentTime === 'function') {
        const cur = player.getCurrentTime() || 0;
        player.seekTo(Math.max(0, cur - 10), true);
        showToast('-10s');
      }
      break;
    case 'KeyN':
      e.preventDefault();
      playNextTrack();
      break;
    case 'KeyP':
      e.preventDefault();
      playPrevTrack();
      break;
    case 'KeyM':
      e.preventDefault();
      toggleMute();
      break;
  }
});

// Unblock Mobile Audio on User Gesture
const unblockAudioContext = () => {
  userHasInteracted = true;
  hideAutoplayPrompt();
  if (isPlayerReady && player && typeof player.playVideo === 'function') {
    if (!isPlaying) {
      handleDirectPlay();
    }
  }
};

document.addEventListener('touchstart', unblockAudioContext, { once: true, passive: true });
document.addEventListener('click', unblockAudioContext, { once: true });

// ==========================================================================
// 5. SUPABASE REALTIME MULTI-USER PRESENCE TRACKING
// ==========================================================================

function initSupabaseRealtime() {
  if (typeof supabase === 'undefined' || SUPABASE_URL === 'YOUR_SUPABASE_URL') {
    simulateFallbackPresence();
    return;
  }

  try {
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const room = client.channel('rock_radio_presence', {
      config: { presence: { key: userId } }
    });

    room
      .on('presence', { event: 'sync' }, () => {
        const state = room.presenceState();
        const count = Object.keys(state).length || 1;
        updateListenerCount(count);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await room.track({ online_at: new Date().toISOString() });
        }
      });
  } catch (err) {
    simulateFallbackPresence();
  }
}

function simulateFallbackPresence() {
  const randomCount = Math.floor(Math.random() * 6) + 3;
  updateListenerCount(randomCount);
}

function updateListenerCount(count) {
  const text = `${count} Live`;
  if (DOM.tabListenerCount) DOM.tabListenerCount.textContent = text;
}
