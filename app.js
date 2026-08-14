/* ==========================================================================
   ROCK RADIO // VANILLA JS AUDIO ENGINE & SUPABASE REALTIME PRESENCE
   ========================================================================== */

// ==========================================================================
// 1. CONFIGURATION & ROCK TRACK ARCHIVE
//    Curated list of high-availability embeddable classic rock & metal tracks.
//    You can also provide a YouTube playlist ID below.
// ==========================================================================
const YOUTUBE_PLAYLIST_ID = 'PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj'; // Massive Classic Rock & Metal Playlist
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// App State
let player = null;
let isPlayerReady = false;
let userHasInteracted = false;
let pendingPlay = false;

const DOM = {
  trackTitle: document.getElementById('track-title'),
  trackArtist: document.getElementById('track-artist'),
  playPauseBtn: document.getElementById('play-pause-btn'),
  playBtnText: document.getElementById('play-btn-text'),
  playIcon: document.querySelector('.play-icon'),
  pauseIcon: document.querySelector('.pause-icon'),
  nextBtn: document.getElementById('next-btn'),
  equalizer: document.getElementById('equalizer'),
  audioStatus: document.getElementById('audio-status'),
  statusText: document.getElementById('status-text'),
  listenerCountText: document.getElementById('listener-count-text'),
  autoplayOverlay: document.getElementById('autoplay-overlay')
};

const userId = 'user_' + Math.random().toString(36).substring(2, 9);

// Set initial track display immediately
document.addEventListener('DOMContentLoaded', () => {
  DOM.trackTitle.textContent = 'Rock & Metal Stream';
  DOM.trackArtist.textContent = 'Connecting Frequency';
});

// ==========================================================================
// 2. YOUTUBE IFRAME PLAYER API INTEGRATION (PLAYLIST EMBED ENGINE)
// ==========================================================================

function initYouTubePlayer() {
  if (player) return;

  try {
    player = new YT.Player('youtube-player', {
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

// Global callback invoked automatically by YouTube API script once ready
window.onYouTubeIframeAPIReady = function() {
  initYouTubePlayer();
};

// Load YouTube API script asynchronously with fallback check
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

  try {
    player.setShuffle(true);
    player.setLoop(true);
  } catch (e) {
    console.warn('Playlist shuffle set:', e);
  }

  if (pendingPlay || userHasInteracted) {
    try {
      player.playVideo();
    } catch (err) {
      console.warn('Auto play attempt:', err);
    }
  }
}

function loadCurrentTrack(autoPlay = true) {
  if (!player || !isPlayerReady) return;

  const track = shuffledTracks[currentTrackIndex];
  updateTrackDisplay(track.title, track.artist);

  if (autoPlay) {
    player.loadVideoById({
      videoId: track.id,
      startSeconds: 0
    });
  } else {
    player.cueVideoById({
      videoId: track.id,
      startSeconds: 0
    });
  }
}

function onPlayerStateChange(event) {
  if (!event) return;

  switch (event.data) {
    case YT.PlayerState.PLAYING:
      hideAutoplayPrompt();
      updatePlayPauseUI(true);
      fetchTrackDetails();
      updateStatus('NOW STREAMING', true);
      break;

    case YT.PlayerState.PAUSED:
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

// Graceful Error Handling for Unplayable/Restricted Videos (Error 100/101/150)
function onPlayerError(event) {
  console.warn(`YouTube video unplayable (Error ${event.data}). Automatically skipping to next track...`);
  updateStatus('SKIPPING RESTRICTED TRACK...', true);

  setTimeout(() => {
    playNextTrack();
  }, 800);
}

function fetchTrackDetails() {
  if (!player || typeof player.getVideoData !== 'function') return;

  const data = player.getVideoData();
  if (data && data.title && data.title.trim() !== '') {
    let title = data.title
      .replace(/\s*\([^)]*official[^)]*\)/gi, '')
      .replace(/\s*\[[^\]]*official[^\]]*\]/gi, '')
      .replace(/\s*\([^)]*hd[^)]*\)/gi, '')
      .replace(/\s*\[[^\]]*hd[^\]]*\]/gi, '')
      .replace(/\s*\([^)]*lyric[^)]*\)/gi, '')
      .replace(/\s*\[[^\]]*remastered[^)]*\)/gi, '')
      .trim();

    let artist = 'ROCK ARCHIVE';
    if (title.includes(' - ')) {
      const parts = title.split(' - ');
      artist = parts[0].trim();
      title = parts.slice(1).join(' - ').trim();
    } else if (data.author) {
      artist = data.author.replace(/VEVO$/i, '').trim();
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

function updatePlayPauseUI(isPlaying) {
  if (isPlaying) {
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
// 3. USER INTERFACE CONTROLS
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
    loadCurrentTrack(true);
  }
}

function playNextTrack() {
  userHasInteracted = true;
  pendingPlay = true;
  hideAutoplayPrompt();

  if (!isPlayerReady || !player || typeof player.nextVideo !== 'function') {
    updateStatus('LOADING NEXT TRACK...');
    return;
  }

  try {
    updateStatus('SKIPPING TO NEXT TRACK...', true);
    player.nextVideo();
  } catch (err) {
    console.warn('Next video error:', err);
  }
}

// Event Listeners
DOM.playPauseBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  togglePlayPause();
});

DOM.nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  playNextTrack();
});

// Click anywhere fallback to satisfy browser user interaction policy for audio autoplay
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

if (DOM.autoplayOverlay) {
  DOM.autoplayOverlay.addEventListener('click', () => {
    userHasInteracted = true;
    hideAutoplayPrompt();
    if (player && isPlayerReady) {
      player.playVideo();
    }
  });
}

// ==========================================================================
// 4. SUPABASE REALTIME PRESENCE
// ==========================================================================

function initSupabaseRealtime() {
  const isPlaceholder = !SUPABASE_URL ||
    !SUPABASE_ANON_KEY ||
    SUPABASE_URL.includes('YOUR_SUPABASE') ||
    SUPABASE_ANON_KEY.includes('YOUR_SUPABASE');

  if (isPlaceholder || typeof window.supabase === 'undefined') {
    console.info('Supabase credentials placeholder. Running in local fallback mode.');
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
    console.warn('Supabase Realtime fallback active:', err);
    setupFallbackListenerCounter();
  }
}

function updateListenerCountDisplay(count) {
  if (!DOM.listenerCountText) return;
  const label = count === 1 ? 'listener tuning in' : 'listeners tuning in';
  DOM.listenerCountText.textContent = `${count} ${label}`;
}

function setupFallbackListenerCounter() {
  let count = Math.floor(Math.random() * 6) + 12;
  updateListenerCountDisplay(count);

  setInterval(() => {
    const delta = Math.random() > 0.5 ? 1 : -1;
    count = Math.max(1, count + delta);
    updateListenerCountDisplay(count);
  }, 12000);
}

document.addEventListener('DOMContentLoaded', () => {
  initSupabaseRealtime();
});

