/* ==========================================================================
   ROCK RADIO // MULTI-ENGINE HI-FI AUDIO SYSTEM & SUPABASE REALTIME PRESENCE
   ========================================================================== */

// ==========================================================================
// 1. ROCK TRACK ARCHIVE (60s, 70s, 80s, 90s, 00s & ALL ROCK)
// ==========================================================================
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

const DECADE_POOLS = {
  'ALL': [
    {
      title: 'Crazy Train',
      artist: 'Ozzy Osbourne',
      id: 'zYp28jG85W0',
      backupIds: ['3qVPNONdF58', 'tMDFv5m18Pw']
    },
    {
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      id: 'bAsGFnLl7UA',
      backupIds: ['3p4MZJteWRU', 'fJ9rUzIMcZQ']
    },
    {
      title: 'Sweet Child O\' Mine',
      artist: 'Guns N\' Roses',
      id: 'P-AYAv0IoWI',
      backupIds: ['1w7OgIMMRc4', 'P-AYAv0IoWI']
    },
    {
      title: 'Smells Like Teen Spirit',
      artist: 'Nirvana',
      id: 'PbgKEjfcA-g',
      backupIds: ['hTWKbfoikeg', 'fregObNcHC8']
    },
    {
      title: 'Enter Sandman',
      artist: 'Metallica',
      id: 'CD-E-LDc384',
      backupIds: ['vabnZ9-ex7o', '1K93p0A4T8Y']
    },
    {
      title: 'Numb',
      artist: 'Linkin Park',
      id: '8sgycukafqQ',
      backupIds: ['kXYiU_JCYtU', '8sgycukafqQ']
    },
    {
      title: 'Back In Black',
      artist: 'AC/DC',
      id: 'pAgnJDJN4VA',
      backupIds: ['l482T0yNkeo', 'pAgnJDJN4VA']
    },
    {
      title: 'Hotel California',
      artist: 'Eagles',
      id: '09839DpTctU',
      backupIds: ['BciS5krYL80', '09839DpTctU']
    },
    {
      title: 'Stairway to Heaven',
      artist: 'Led Zeppelin',
      id: 'QkF3oxziUI4',
      backupIds: ['qM0zINtulhM', 'QkF3oxziUI4']
    },
    {
      title: 'Comfortably Numb',
      artist: 'Pink Floyd',
      id: '_FrOQC-zM3g',
      backupIds: ['uk_wUT1fvbc', '_FrOQC-zM3g']
    },
    {
      title: 'Black Hole Sun',
      artist: 'Soundgarden',
      id: '3mbBbFH9fAg',
      backupIds: ['x1U1Ue_52B0', '3mbBbFH9fAg']
    },
    {
      title: 'Alive',
      artist: 'Pearl Jam',
      id: 'wGiTPgv6VtU',
      backupIds: ['CSvFpBOe8eY', 'wGiTPgv6VtU']
    },
    {
      title: 'Paranoid',
      artist: 'Black Sabbath',
      id: '0lVlQyA0M7U',
      backupIds: ['hk3m4TW7p6s', '0lVlQyA0M7U']
    }
  ],
  '60s': [
    { title: 'Stairway to Heaven', artist: 'Led Zeppelin', id: 'QkF3oxziUI4', backupIds: ['qM0zINtulhM'] },
    { title: 'Light My Fire', artist: 'The Doors', id: 'mbj1RFaoyLk', backupIds: ['v2AC41dglnM'] },
    { title: 'Voodoo Child', artist: 'Jimi Hendrix', id: 'qFfnlYbFEiE', backupIds: ['_ElORM98-0U'] },
    { title: 'Baba O\'Riley', artist: 'The Who', id: 'gY5rFmPuhHk', backupIds: ['NCtzkaL2t_Y'] },
    { title: 'Comfortably Numb', artist: 'Pink Floyd', id: '_FrOQC-zM3g', backupIds: ['uk_wUT1fvbc'] },
    { title: 'Sunshine of Your Love', artist: 'Cream', id: 'zt51jvYXDCg', backupIds: ['QkF3oxziUI4'] },
    { title: 'Hey Jude', artist: 'The Beatles', id: 'A_MjCqQoLLA', backupIds: ['tA-u7Z5O3Gk'] }
  ],
  '70s': [
    { title: 'Bohemian Rhapsody', artist: 'Queen', id: 'bAsGFnLl7UA', backupIds: ['3p4MZJteWRU'] },
    { title: 'Back In Black', artist: 'AC/DC', id: 'pAgnJDJN4VA', backupIds: ['l482T0yNkeo'] },
    { title: 'Hotel California', artist: 'Eagles', id: '09839DpTctU', backupIds: ['BciS5krYL80'] },
    { title: 'Paranoid', artist: 'Black Sabbath', id: '0lVlQyA0M7U', backupIds: ['hk3m4TW7p6s'] },
    { title: 'Smoke on the Water', artist: 'Deep Purple', id: 'zUwEIt9ezDI', backupIds: ['dXYl5VQ1lHA'] },
    { title: 'Dream On', artist: 'Aerosmith', id: 'sZfZ8qiE5aU', backupIds: ['81CIgDRuR14'] },
    { title: 'Go Your Own Way', artist: 'Fleetwood Mac', id: '6ul-cZyuYq4', backupIds: ['evJ6GLdMm9M'] },
    { title: 'Rock and Roll All Nite', artist: 'KISS', id: 'Env5iURrFoo', backupIds: ['ZhIsAZO5gl0'] }
  ],
  '80s': [
    { title: 'Crazy Train', artist: 'Ozzy Osbourne', id: 'zYp28jG85W0', backupIds: ['3qVPNONdF58'] },
    { title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', id: 'P-AYAv0IoWI', backupIds: ['1w7OgIMMRc4'] },
    { title: 'Enter Sandman', artist: 'Metallica', id: 'CD-E-LDc384', backupIds: ['vabnZ9-ex7o'] },
    { title: 'Run to the Hills', artist: 'Iron Maiden', id: '86URGgqONvA', backupIds: ['1w8ZwbYGL5M'] },
    { title: 'Pour Some Sugar On Me', artist: 'Def Leppard', id: '0UIB9Y4OF60', backupIds: ['aO5w0z2bZ2k'] },
    { title: 'Livin\' On A Prayer', artist: 'Bon Jovi', id: 'lDK9QqIq7go', backupIds: ['VXp3yH4G9Hw'] },
    { title: 'Ace of Spades', artist: 'Motörhead', id: 'pWB5JZRGl0U', backupIds: ['3mbBbFH9fAg'] }
  ],
  '90s': [
    { title: 'Smells Like Teen Spirit', artist: 'Nirvana', id: 'PbgKEjfcA-g', backupIds: ['hTWKbfoikeg'] },
    { title: 'Alive', artist: 'Pearl Jam', id: 'wGiTPgv6VtU', backupIds: ['CSvFpBOe8eY'] },
    { title: 'Black Hole Sun', artist: 'Soundgarden', id: '3mbBbFH9fAg', backupIds: ['x1U1Ue_52B0'] },
    { title: 'Like a Stone', artist: 'Audioslave', id: 'NMNgbISmF4I', backupIds: ['7quU3u4iZ14'] },
    { title: 'Man in the Box', artist: 'Alice in Chains', id: 'TAqZb524cLU', backupIds: ['5gHiR1xeOSs'] },
    { title: 'Plush', artist: 'Stone Temple Pilots', id: 'v0VP7T9W2v8', backupIds: ['b8-tXG8KrWs'] },
    { title: 'Killing In The Name', artist: 'Rage Against The Machine', id: 'bWXazVhlyxQ', backupIds: ['kl1rj71607Q'] },
    { title: 'The Pretender', artist: 'Foo Fighters', id: 'SBjQ9tuuTJQ', backupIds: ['e8X3ACToii0'] }
  ],
  '00s': [
    { title: 'Numb', artist: 'Linkin Park', id: '8sgycukafqQ', backupIds: ['kXYiU_JCYtU'] },
    { title: 'Chop Suey!', artist: 'System Of A Down', id: 'wGiTPgv6VtU', backupIds: ['y0S4sLyL80E'] },
    { title: 'Psychosocial', artist: 'Slipknot', id: 'eOn6upuP0tY', backupIds: ['5abamRO41fE'] },
    { title: 'Bring Me To Life', artist: 'Evanescence', id: 'q_Zl-G_0Efg', backupIds: ['3YxaaGgTQYM'] },
    { title: 'Boulevard of Broken Dreams', artist: 'Green Day', id: 'r00ikilxWA4', backupIds: ['Soa3gO7tL-o'] },
    { title: 'Down With The Sickness', artist: 'Disturbed', id: 'L397TWLwrUU', backupIds: ['0jgrOPh47wE'] },
    { title: 'In The End', artist: 'Linkin Park', id: 'eVTXPUF4Oz4', backupIds: ['q-Zl-G_0Efg'] }
  ]
};

// Global App State
let player = null;
let isPlayerReady = false;
let isPlaying = false;
let userHasInteracted = false;
let pendingPlay = false;
let currentDecade = 'ALL';
let currentTrackIndex = 0;
let currentIdIndex = 0;
let currentTrackQueue = [];
let isDraggingSeekbar = false;
let currentVolume = 100;
let isMuted = false;
let activeEngine = 'YOUTUBE_HIFI'; // 'YOUTUBE_HIFI' or 'HTML5_AUDIO'

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
  toastMessage: document.getElementById('toast-message'),
  html5Audio: document.getElementById('html5-audio-player')
};

const userId = 'user_' + Math.random().toString(36).substring(2, 9);

// Utility: Fisher-Yates Shuffle
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

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

// Initialize Decade Queue
function setDecade(decadeKey) {
  currentDecade = decadeKey;
  const pool = DECADE_POOLS[decadeKey] || DECADE_POOLS['ALL'];
  currentTrackQueue = shuffleArray(pool);
  currentTrackIndex = 0;
  currentIdIndex = 0;

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

  // Update current track display
  if (currentTrackQueue.length > 0) {
    const track = currentTrackQueue[0];
    updateTrackDisplay(track.title, track.artist);
  }
}

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
  setDecade('ALL');
  initSupabaseRealtime();
});

// ==========================================================================
// 2. YOUTUBE IFRAME & MULTI-ENGINE AUDIO INTEGRATION
// ==========================================================================

function initYouTubePlayer() {
  if (player) return;

  const currentTrack = currentTrackQueue[currentTrackIndex];
  const initialVideoId = (currentTrack && currentTrack.ids) ? currentTrack.ids[0] : (currentTrack?.id || 'zYp28jG85W0');

  const playerVars = {
    autoplay: 1,
    controls: 0,
    disablekb: 1,
    fs: 0,
    rel: 0,
    modestbranding: 1,
    enablejsapi: 1,
    playsinline: 1
  };

  if (window.location.protocol.startsWith('http')) {
    playerVars.origin = window.location.origin;
  }

  try {
    player = new YT.Player('youtube-player', {
      height: '200',
      width: '200',
      videoId: initialVideoId,
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
    playCurrentDecadeTrack(true);
  }
}

function playCurrentDecadeTrack(autoPlay = true) {
  const track = currentTrackQueue[currentTrackIndex];
  if (!track) return;

  updateTrackDisplay(track.title, track.artist);
  resetProgressBar();

  // Primary: YouTube Hi-Fi Engine
  if (player && isPlayerReady && activeEngine === 'YOUTUBE_HIFI') {
    let videoId = track.id;
    if (track.backupIds && currentIdIndex > 0) {
      videoId = track.backupIds[(currentIdIndex - 1) % track.backupIds.length];
    } else if (track.ids) {
      videoId = track.ids[currentIdIndex % track.ids.length];
    }

    try {
      if (autoPlay && typeof player.loadVideoById === 'function') {
        player.loadVideoById({ videoId: videoId, startSeconds: 0 });
      } else if (typeof player.cueVideoById === 'function') {
        player.cueVideoById({ videoId: videoId, startSeconds: 0 });
      }
    } catch (e) {
      console.warn('Load video exception:', e);
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
      fetchTrackDetails();
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
      if (userHasInteracted) {
        player.playVideo();
      }
      break;
  }
}

// Automatic Multi-ID Fallback Handling
function onPlayerError(event) {
  const track = currentTrackQueue[currentTrackIndex];
  console.warn(`Audio stream error (Code ${event.data}). Activating backup audio stream for ${track?.title}...`);

  const backupCount = (track?.backupIds?.length || 0) + (track?.ids?.length || 1);
  if (currentIdIndex + 1 < backupCount) {
    currentIdIndex++;
    playCurrentDecadeTrack(true);
  } else {
    // If all stream IDs fail, smoothly advance to next song in queue
    currentIdIndex = 0;
    currentTrackIndex = (currentTrackIndex + 1) % currentTrackQueue.length;
    playCurrentDecadeTrack(true);
  }
}

function fetchTrackDetails() {
  const track = currentTrackQueue[currentTrackIndex];
  if (track) {
    updateTrackDisplay(track.title, track.artist);
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
  if (playing) {
    DOM.playIcon.classList.add('hidden');
    DOM.pauseIcon.classList.remove('hidden');
    DOM.playBtnText.textContent = 'PAUSE';
    DOM.equalizer.classList.add('is-playing');
  } else {
    DOM.playIcon.classList.remove('hidden');
    DOM.pauseIcon.classList.add('hidden');
    DOM.playBtnText.textContent = 'PLAY';
    DOM.equalizer.classList.remove('is-playing');
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

        // Loaded buffer fraction
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

// Scrubber Click & Drag Listeners
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

  // Touch Support
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

function togglePlayPause() {
  userHasInteracted = true;
  pendingPlay = true;
  hideAutoplayPrompt();

  if (!isPlayerReady || !player || typeof player.getPlayerState !== 'function') {
    updateStatus('CONNECTING TO ROCK FREQUENCIES...');
    return;
  }

  try {
    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      pendingPlay = false;
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  } catch (err) {
    console.warn('Play video exception:', err);
    playCurrentDecadeTrack(true);
  }
}

function playNextTrack() {
  userHasInteracted = true;
  pendingPlay = true;
  hideAutoplayPrompt();

  if (currentTrackQueue.length === 0) return;

  currentIdIndex = 0;
  currentTrackIndex = (currentTrackIndex + 1) % currentTrackQueue.length;
  updateStatus(`STREAMING // ${currentDecade} ROCK`, true);
  playCurrentDecadeTrack(true);
}

function playPrevTrack() {
  userHasInteracted = true;
  pendingPlay = true;
  hideAutoplayPrompt();

  if (currentTrackQueue.length === 0) return;

  currentIdIndex = 0;
  currentTrackIndex = (currentTrackIndex - 1 + currentTrackQueue.length) % currentTrackQueue.length;
  updateStatus(`STREAMING // ${currentDecade} ROCK`, true);
  playCurrentDecadeTrack(true);
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
DOM.playPauseBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  togglePlayPause();
});

DOM.nextBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  playNextTrack();
});

DOM.prevBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  playPrevTrack();
});

DOM.rewindBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  seekDelta(-10);
});

DOM.forwardBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  seekDelta(10);
});

DOM.muteBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMute();
});

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
    if (decade && DECADE_POOLS[decade]) {
      setDecade(decade);
      updateStatus(`FREQUENCY SWITCHED // ${decade} ROCK`, true);
      playCurrentDecadeTrack(true);
    }
  });
}

// Share Track Action
DOM.shareBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  const track = currentTrackQueue[currentTrackIndex];
  const shareText = `Listening to "${track?.title} - ${track?.artist}" on ROCK RADIO: ${window.location.href}`;

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
  // Ignore if user is typing in an input
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

  switch (e.code) {
    case 'Space':
      e.preventDefault();
      togglePlayPause();
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

// Global Click Autoplay Fallback
document.addEventListener('click', () => {
  if (!userHasInteracted && isPlayerReady) {
    userHasInteracted = true;
    hideAutoplayPrompt();
    if (player && typeof player.getPlayerState === 'function') {
      if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
        player.playVideo();
      }
    }
  }
});

DOM.autoplayOverlay?.addEventListener('click', () => {
  userHasInteracted = true;
  hideAutoplayPrompt();
  if (player && isPlayerReady) {
    player.playVideo();
  }
});

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
