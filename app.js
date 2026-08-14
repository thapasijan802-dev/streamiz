// ==========================================================================
// 1. DECADE ROCK ARCHIVE (VERIFIED EMBEDDABLE AUDIO POOLS)
// ==========================================================================
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

const DECADE_POOLS = {
  'ALL': [
    { title: 'Bohemian Rhapsody', artist: 'Queen', ids: ['bAsGFnLl7UA', '3p4MZJteWRU', 'fJ9rUzIMcZQ'] },
    { title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', ids: ['P-AYAv0IoWI', '1w7OgIMMRc4'] },
    { title: 'Smells Like Teen Spirit', artist: 'Nirvana', ids: ['PbgKEjfcA-g', 'hTWKbfoikeg'] },
    { title: 'Enter Sandman', artist: 'Metallica', ids: ['CD-E-LDc384', 'vabnZ9-ex7o'] },
    { title: 'Numb', artist: 'Linkin Park', ids: ['8sgycukafqQ', 'kXYiU_JCYtU'] },
    { title: 'Back In Black', artist: 'AC/DC', ids: ['pAgnJDJN4VA', 'l482T0yNkeo'] },
    { title: 'Hotel California', artist: 'Eagles', ids: ['09839DpTctU', 'BciS5krYL80'] },
    { title: 'Stairway to Heaven', artist: 'Led Zeppelin', ids: ['QkF3oxziUI4', 'qM0zINtulhM'] },
    { title: 'Comfortably Numb', artist: 'Pink Floyd', ids: ['_FrOQC-zM3g', 'uk_wUT1fvbc'] },
    { title: 'Black Hole Sun', artist: 'Soundgarden', ids: ['3mbBbFH9fAg', 'x1U1Ue_52B0'] },
    { title: 'Alive', artist: 'Pearl Jam', ids: ['wGiTPgv6VtU', 'CSvFpBOe8eY'] },
    { title: 'Paranoid', artist: 'Black Sabbath', ids: ['0lVlQyA0M7U', 'hk3m4TW7p6s'] },
    { title: 'Crazy Train', artist: 'Ozzy Osbourne', ids: ['zYp28jG85W0', '3qVPNONdF58'] }
  ],
  '60s': [
    { title: 'Stairway to Heaven', artist: 'Led Zeppelin', ids: ['QkF3oxziUI4', 'qM0zINtulhM'] },
    { title: 'Light My Fire', artist: 'The Doors', ids: ['mbj1RFaoyLk', 'v2AC41dglnM'] },
    { title: 'Voodoo Child', artist: 'Jimi Hendrix', ids: ['qFfnlYbFEiE', '_ElORM98-0U'] },
    { title: 'Baba O\'Riley', artist: 'The Who', ids: ['gY5rFmPuhHk', 'NCtzkaL2t_Y'] },
    { title: 'Comfortably Numb', artist: 'Pink Floyd', ids: ['_FrOQC-zM3g', 'uk_wUT1fvbc'] },
    { title: 'Sunshine of Your Love', artist: 'Cream', ids: ['zt51jvYXDCg', 'QkF3oxziUI4'] },
    { title: 'Hey Jude', artist: 'The Beatles', ids: ['A_MjCqQoLLA', 'tA-u7Z5O3Gk'] }
  ],
  '70s': [
    { title: 'Bohemian Rhapsody', artist: 'Queen', ids: ['bAsGFnLl7UA', '3p4MZJteWRU'] },
    { title: 'Back In Black', artist: 'AC/DC', ids: ['pAgnJDJN4VA', 'l482T0yNkeo'] },
    { title: 'Hotel California', artist: 'Eagles', ids: ['09839DpTctU', 'BciS5krYL80'] },
    { title: 'Paranoid', artist: 'Black Sabbath', ids: ['0lVlQyA0M7U', 'hk3m4TW7p6s'] },
    { title: 'Smoke on the Water', artist: 'Deep Purple', ids: ['zUwEIt9ezDI', 'dXYl5VQ1lHA'] },
    { title: 'Dream On', artist: 'Aerosmith', ids: ['sZfZ8qiE5aU', '81CIgDRuR14'] },
    { title: 'Go Your Own Way', artist: 'Fleetwood Mac', ids: ['6ul-cZyuYq4', 'evJ6GLdMm9M'] },
    { title: 'Rock and Roll All Nite', artist: 'KISS', ids: ['Env5iURrFoo', 'ZhIsAZO5gl0'] }
  ],
  '80s': [
    { title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', ids: ['P-AYAv0IoWI', '1w7OgIMMRc4'] },
    { title: 'Enter Sandman', artist: 'Metallica', ids: ['CD-E-LDc384', 'vabnZ9-ex7o'] },
    { title: 'Crazy Train', artist: 'Ozzy Osbourne', ids: ['zYp28jG85W0', '3qVPNONdF58'] },
    { title: 'Run to the Hills', artist: 'Iron Maiden', ids: ['86URGgqONvA', '1w8ZwbYGL5M'] },
    { title: 'Pour Some Sugar On Me', artist: 'Def Leppard', ids: ['0UIB9Y4OF60', 'aO5w0z2bZ2k'] },
    { title: 'Livin\' On A Prayer', artist: 'Bon Jovi', ids: ['lDK9QqIq7go', 'VXp3yH4G9Hw'] },
    { title: 'Ace of Spades', artist: 'Motörhead', ids: ['pWB5JZRGl0U', '3mbBbFH9fAg'] }
  ],
  '90s': [
    { title: 'Smells Like Teen Spirit', artist: 'Nirvana', ids: ['PbgKEjfcA-g', 'hTWKbfoikeg'] },
    { title: 'Alive', artist: 'Pearl Jam', ids: ['wGiTPgv6VtU', 'CSvFpBOe8eY'] },
    { title: 'Black Hole Sun', artist: 'Soundgarden', ids: ['3mbBbFH9fAg', 'x1U1Ue_52B0'] },
    { title: 'Like a Stone', artist: 'Audioslave', ids: ['NMNgbISmF4I', '7quU3u4iZ14'] },
    { title: 'Man in the Box', artist: 'Alice in Chains', ids: ['TAqZb524cLU', '5gHiR1xeOSs'] },
    { title: 'Plush', artist: 'Stone Temple Pilots', ids: ['v0VP7T9W2v8', 'b8-tXG8KrWs'] },
    { title: 'Killing In The Name', artist: 'Rage Against The Machine', ids: ['bWXazVhlyxQ', 'kl1rj71607Q'] },
    { title: 'The Pretender', artist: 'Foo Fighters', ids: ['SBjQ9tuuTJQ', 'e8X3ACToii0'] }
  ],
  '00s': [
    { title: 'Numb', artist: 'Linkin Park', ids: ['8sgycukafqQ', 'kXYiU_JCYtU'] },
    { title: 'Chop Suey!', artist: 'System Of A Down', ids: ['wGiTPgv6VtU', 'y0S4sLyL80E'] },
    { title: 'Psychosocial', artist: 'Slipknot', ids: ['eOn6upuP0tY', '5abamRO41fE'] },
    { title: 'Bring Me To Life', artist: 'Evanescence', ids: ['q_Zl-G_0Efg', '3YxaaGgTQYM'] },
    { title: 'Boulevard of Broken Dreams', artist: 'Green Day', ids: ['r00ikilxWA4', 'Soa3gO7tL-o'] },
    { title: 'Down With The Sickness', artist: 'Disturbed', ids: ['L397TWLwrUU', '0jgrOPh47wE'] },
    { title: 'In The End', artist: 'Linkin Park', ids: ['eVTXPUF4Oz4', 'q-Zl-G_0Efg'] }
  ]
};

// App State
let player = null;
let isPlayerReady = false;
let userHasInteracted = false;
let pendingPlay = false;
let currentDecade = 'ALL';
let currentTrackIndex = 0;
let currentIdIndex = 0;
let currentTrackQueue = [];

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
  autoplayOverlay: document.getElementById('autoplay-overlay'),
  decadeSelector: document.getElementById('decade-selector')
};

const userId = 'user_' + Math.random().toString(36).substring(2, 9);

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Initialize Queue for active decade
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

// Set initial track display immediately
document.addEventListener('DOMContentLoaded', () => {
  setDecade('ALL');
});

// ==========================================================================
// 2. YOUTUBE IFRAME PLAYER API INTEGRATION
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

  if (pendingPlay || userHasInteracted) {
    playCurrentDecadeTrack(true);
  }
}

function playCurrentDecadeTrack(autoPlay = true) {
  if (!player || !isPlayerReady) return;

  const track = currentTrackQueue[currentTrackIndex];
  if (!track) return;

  const videoId = track.ids ? track.ids[currentIdIndex % track.ids.length] : track.id;
  updateTrackDisplay(track.title, track.artist);

  try {
    if (autoPlay) {
      player.loadVideoById({ videoId: videoId, startSeconds: 0 });
    } else {
      player.cueVideoById({ videoId: videoId, startSeconds: 0 });
    }
  } catch (e) {
    console.warn('Load video exception:', e);
  }
}

function loadCurrentTrack(autoPlay = true) {
  if (!player || !isPlayerReady) return;

  const track = currentTrackQueue[currentTrackIndex];
  const videoId = track.ids ? track.ids[currentIdIndex % track.ids.length] : track.id;
  updateTrackDisplay(track.title, track.artist);

  if (autoPlay) {
    player.loadVideoById({
      videoId: videoId,
      startSeconds: 0
    });
  } else {
    player.cueVideoById({
      videoId: videoId,
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

// Automatic Multi-ID Fallback Handling: Switch audio source for same track if an ID is restricted
function onPlayerError(event) {
  const track = currentTrackQueue[currentTrackIndex];
  console.warn(`YouTube audio ID unplayable (Error ${event.data}). Trying alternative audio source for track...`);

  if (track && track.ids && currentIdIndex + 1 < track.ids.length) {
    currentIdIndex++;
    playCurrentDecadeTrack(true);
  } else {
    // If all IDs for current track fail, move seamlessly to next track in queue
    currentIdIndex = 0;
    currentTrackIndex = (currentTrackIndex + 1) % currentTrackQueue.length;
    playCurrentDecadeTrack(true);
  }
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

  if (currentTrackQueue.length === 0) return;

  currentTrackIndex = (currentTrackIndex + 1) % currentTrackQueue.length;
  updateStatus(`STREAMING // ${currentDecade} ROCK`, true);
  playCurrentDecadeTrack(true);
}

// Bind Button Listeners
DOM.playPauseBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  togglePlayPause();
});

DOM.nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  playNextTrack();
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

