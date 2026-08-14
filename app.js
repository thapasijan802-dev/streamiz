/* ==========================================================================
   PREMIUM ROCK MUSIC PLAYER ENGINE - CORE JAVASCRIPT CONTROLLER
   ========================================================================== */

// ==========================================================================
// 1. ROCK MUSIC DATABASE (CURATED ALBUMS, SONGS & CHANNEL PLAYLISTS)
// ==========================================================================

const TRACKS_DB = [
  // Arctic Monkeys - AM (2013)
  { id: 'am_1', title: 'Do I Wanna Know?', artist: 'Arctic Monkeys', album: 'AM', year: '2013', duration: '4:32', youtubeId: 'bpOSxM0rNPM', cover: 'assets/art_am.jpg', decade: '00s' },
  { id: 'am_2', title: 'R U Mine?', artist: 'Arctic Monkeys', album: 'AM', year: '2013', duration: '3:21', youtubeId: 'H8tLS_C43yQ', cover: 'assets/art_am.jpg', decade: '00s' },
  { id: 'am_3', title: 'Arabella', artist: 'Arctic Monkeys', album: 'AM', year: '2013', duration: '3:27', youtubeId: 'Jn6-TUtLHJo', cover: 'assets/art_am.jpg', decade: '00s' },
  { id: 'am_4', title: 'Why\'d You Only Call Me When You\'re High?', artist: 'Arctic Monkeys', album: 'AM', year: '2013', duration: '2:41', youtubeId: '6366dxFf-gQ', cover: 'assets/art_am.jpg', decade: '00s' },
  { id: 'am_5', title: '505', artist: 'Arctic Monkeys', album: 'Favourite Worst Nightmare', year: '2007', duration: '4:13', youtubeId: 'qU9mHegkTc4', cover: 'assets/art_am.jpg', decade: '00s' },

  // Nirvana - Nevermind (1991)
  { id: 'nir_1', title: 'Smells Like Teen Spirit', artist: 'Nirvana', album: 'Nevermind', year: '1991', duration: '5:01', youtubeId: 'hTWKbfoikeg', cover: 'assets/art_am.jpg', decade: '90s' },
  { id: 'nir_2', title: 'Come As You Are', artist: 'Nirvana', album: 'Nevermind', year: '1991', duration: '3:39', youtubeId: 'vabnZ9-ex7o', cover: 'assets/art_am.jpg', decade: '90s' },
  { id: 'nir_3', title: 'Lithium', artist: 'Nirvana', album: 'Nevermind', year: '1991', duration: '4:17', youtubeId: 'pkcJEvMcnEg', cover: 'assets/art_am.jpg', decade: '90s' },
  { id: 'nir_4', title: 'In Bloom', artist: 'Nirvana', album: 'Nevermind', year: '1991', duration: '4:15', youtubeId: 'Zt8SF_8G_bE', cover: 'assets/art_am.jpg', decade: '90s' },

  // Jimi Hendrix - Electric Ladyland (1968)
  { id: 'jh_1', title: 'All Along the Watchtower', artist: 'Jimi Hendrix', album: 'Electric Ladyland', year: '1968', duration: '4:01', youtubeId: 'TLV4_xx4Urk', cover: 'assets/art_am.jpg', decade: '60s' },
  { id: 'jh_2', title: 'Voodoo Child (Slight Return)', artist: 'Jimi Hendrix', album: 'Electric Ladyland', year: '1968', duration: '5:12', youtubeId: 'f_H52Gfl_P8', cover: 'assets/art_am.jpg', decade: '60s' },

  // Queen - A Night at the Opera (1975)
  { id: 'q_1', title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', year: '1975', duration: '5:55', youtubeId: 'fJ9rUzIMcZQ', cover: 'assets/art_am.jpg', decade: '70s' },
  { id: 'q_2', title: 'You\'re My Best Friend', artist: 'Queen', album: 'A Night at the Opera', year: '1975', duration: '2:52', youtubeId: 'Ka4N42_369A', cover: 'assets/art_am.jpg', decade: '70s' },

  // Guns N' Roses - Appetite for Destruction (1987)
  { id: 'gnr_1', title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', album: 'Appetite for Destruction', year: '1987', duration: '5:56', youtubeId: '1w7OgIMMRc4', cover: 'assets/art_am.jpg', decade: '80s' },
  { id: 'gnr_2', title: 'Welcome to the Jungle', artist: 'Guns N\' Roses', album: 'Appetite for Destruction', year: '1987', duration: '4:34', youtubeId: 'o1tj2zJ2Wvg', cover: 'assets/art_am.jpg', decade: '80s' },
  { id: 'gnr_3', title: 'Paradise City', artist: 'Guns N\' Roses', album: 'Appetite for Destruction', year: '1987', duration: '6:46', youtubeId: 'RmxV4Gz6e8I', cover: 'assets/art_am.jpg', decade: '80s' },

  // Radiohead - OK Computer (1997)
  { id: 'rh_1', title: 'Paranoid Android', artist: 'Radiohead', album: 'OK Computer', year: '1997', duration: '6:23', youtubeId: 'fHiGbolffGw', cover: 'assets/art_am.jpg', decade: '90s' },
  { id: 'rh_2', title: 'Karma Police', artist: 'Radiohead', album: 'OK Computer', year: '1997', duration: '4:21', youtubeId: '1uYWYWPcOw0', cover: 'assets/art_am.jpg', decade: '90s' },
  { id: 'rh_3', title: 'No Surprises', artist: 'Radiohead', album: 'OK Computer', year: '1997', duration: '3:48', youtubeId: 'u5CVsCnxyXg', cover: 'assets/art_am.jpg', decade: '90s' },

  // The White Stripes - Elephant (2003)
  { id: 'tws_1', title: 'Seven Nation Army', artist: 'The White Stripes', album: 'Elephant', year: '2003', duration: '3:52', youtubeId: '0J2QdDbelmY', cover: 'assets/art_am.jpg', decade: '00s' },

  // The Strokes - Is This It (2001)
  { id: 'str_1', title: 'Last Nite', artist: 'The Strokes', album: 'Is This It', year: '2001', duration: '3:13', youtubeId: 'TOypSnKFHrY', cover: 'assets/art_am.jpg', decade: '00s' },
  { id: 'str_2', title: 'Someday', artist: 'The Strokes', album: 'Is This It', year: '2001', duration: '3:03', youtubeId: 'ndYEdT1yWYc', cover: 'assets/art_am.jpg', decade: '00s' },

  // Muse - Black Holes and Revelations (2006)
  { id: 'mus_1', title: 'Supermassive Black Hole', artist: 'Muse', album: 'Black Holes and Revelations', year: '2006', duration: '3:29', youtubeId: 'bBb-J0DpKbA', cover: 'assets/art_am.jpg', decade: '00s' },
  { id: 'mus_2', title: 'Knights of Cydonia', artist: 'Muse', album: 'Black Holes and Revelations', year: '2006', duration: '6:06', youtubeId: 'zq4_yPnYqiY', cover: 'assets/art_am.jpg', decade: '00s' },

  // Tame Impala - Currents (2015)
  { id: 'ti_1', title: 'The Less I Know the Better', artist: 'Tame Impala', album: 'Currents', year: '2015', duration: '3:37', youtubeId: 's7eeYs5T9wY', cover: 'assets/art_am.jpg', decade: '00s' },
  { id: 'ti_2', title: 'Let It Happen', artist: 'Tame Impala', album: 'Currents', year: '2015', duration: '7:47', youtubeId: 'NPyiZp8P39c', cover: 'assets/art_am.jpg', decade: '00s' }
];

// Structuring Album Objects manually to control metadata and sorting
const ALBUMS = {
  'am': { id: 'am', title: 'AM', artist: 'Arctic Monkeys', year: '2013', cover: 'assets/art_am.jpg', tracks: [] },
  'nevermind': { id: 'nevermind', title: 'Nevermind', artist: 'Nirvana', year: '1991', cover: 'assets/art_am.jpg', tracks: [] },
  'electric_ladyland': { id: 'electric_ladyland', title: 'Electric Ladyland', artist: 'Jimi Hendrix', year: '1968', cover: 'assets/art_am.jpg', tracks: [] },
  'night_at_opera': { id: 'night_at_opera', title: 'A Night at the Opera', artist: 'Queen', year: '1975', cover: 'assets/art_am.jpg', tracks: [] },
  'appetite_destruction': { id: 'appetite_destruction', title: 'Appetite for Destruction', artist: 'Guns N\' Roses', year: '1987', cover: 'assets/art_am.jpg', tracks: [] },
  'ok_computer': { id: 'ok_computer', title: 'OK Computer', artist: 'Radiohead', year: '1997', cover: 'assets/art_am.jpg', tracks: [] },
  'elephant': { id: 'elephant', title: 'Elephant', artist: 'The White Stripes', year: '2003', cover: 'assets/art_am.jpg', tracks: [] },
  'is_this_it': { id: 'is_this_it', title: 'Is This It', artist: 'The Strokes', year: '2001', cover: 'assets/art_am.jpg', tracks: [] },
  'black_holes': { id: 'black_holes', title: 'Black Holes and Revelations', artist: 'Muse', year: '2006', cover: 'assets/art_am.jpg', tracks: [] },
  'currents': { id: 'currents', title: 'Currents', artist: 'Tame Impala', year: '2015', cover: 'assets/art_am.jpg', tracks: [] }
};

// Map tracks database into corresponding albums
TRACKS_DB.forEach(track => {
  const albumKey = Object.keys(ALBUMS).find(key => ALBUMS[key].title.toLowerCase() === track.album.toLowerCase());
  if (albumKey) {
    ALBUMS[albumKey].tracks.push(track);
  }
});

// Decades lists structured as Special Curated playlists
const DECADE_PLAYLISTS = {
  'decade_all': { id: 'decade_all', title: 'ALL ROCK RADIO', desc: 'Continuous Rock & Metal across all eras', tracks: TRACKS_DB },
  'decade_60s': { id: 'decade_60s', title: '60s CLASSIC ROCK', desc: 'Jimi Hendrix, The Doors, The Beatles, The Who', tracks: TRACKS_DB.filter(t => t.decade === '60s') },
  'decade_70s': { id: 'decade_70s', title: '70s HARD ROCK', desc: 'Led Zeppelin, Queen, AC/DC, Black Sabbath', tracks: TRACKS_DB.filter(t => t.decade === '70s') },
  'decade_80s': { id: 'decade_80s', title: '80s HEAVY METAL', desc: 'Metallica, Guns N\' Roses, Iron Maiden, Judas Priest', tracks: TRACKS_DB.filter(t => t.decade === '80s') },
  'decade_90s': { id: 'decade_90s', title: '90s GRUNGE & ALT', desc: 'Nirvana, Soundgarden, Alice In Chains, Radiohead', tracks: TRACKS_DB.filter(t => t.decade === '90s') },
  'decade_00s': { id: 'decade_00s', title: '00s MODERN ROCK', desc: 'Arctic Monkeys, The Strokes, Muse, Tame Impala', tracks: TRACKS_DB.filter(t => t.decade === '00s') }
};

// ==========================================================================
// 2. CENTRALIZED APPLICATION PLAYBACK & UI STATE
// ==========================================================================

const state = {
  currentTrack: null,
  isPlaying: false,
  queue: [...TRACKS_DB],  // default queue
  queueIndex: 0,
  currentVolume: 100,
  isMuted: false,
  likedSongs: new Set(['am_1', 'nir_1', 'jh_1']), // pre-liked some tracks for display
  activeTab: 'home',      // 'home' | 'search' | 'library'
  activeSubPage: null,    // e.g., { type: 'album', id: 'am' }
  history: [],            // subpage history for back-navigation
  searchQuery: '',
  isQueueOpen: true,
  userHasInteracted: false,
  isPlayerReady: false,
  pendingPlay: false,
  isDraggingSeekbar: false
};

// DOM References
const DOM = {
  appContainer: document.querySelector('.app-container'),
  contentStage: document.getElementById('content-stage'),
  searchBarContainer: document.getElementById('search-bar-container'),
  searchInput: document.getElementById('search-input'),
  searchClearBtn: document.getElementById('search-clear-btn'),
  navBackBtn: document.getElementById('nav-back-btn'),
  listenerCountText: document.getElementById('listener-count-text'),
  
  // Desktop Sidebar items
  navHome: document.getElementById('nav-home'),
  navSearch: document.getElementById('nav-search'),
  navLibrary: document.getElementById('nav-library'),
  navSubPlaylists: document.getElementById('nav-sub-playlists'),
  navSubDecades: document.getElementById('nav-sub-decades'),
  navSubArtists: document.getElementById('nav-sub-artists'),
  navSubLiked: document.getElementById('nav-sub-liked'),

  // Desktop Bottom Player Bar
  playerTrackTitle: document.getElementById('player-track-title'),
  playerTrackArtist: document.getElementById('player-track-artist'),
  playerArtworkImg: document.getElementById('player-artwork-img'),
  playerArtPlaceholder: document.getElementById('player-art-placeholder'),
  playerArtTrigger: document.getElementById('player-art-trigger'),
  playerLikeBtn: document.getElementById('player-like-btn'),
  playerPlayPauseBtn: document.getElementById('player-play-pause-btn'),
  playerPrevBtn: document.getElementById('player-prev-btn'),
  playerNextBtn: document.getElementById('player-next-btn'),
  playerShuffleBtn: document.getElementById('player-shuffle-btn'),
  playerRepeatBtn: document.getElementById('player-repeat-btn'),
  playerTimeCurrent: document.getElementById('player-time-current'),
  playerTimeDuration: document.getElementById('player-time-duration'),
  playerProgressContainer: document.getElementById('player-progress-container'),
  playerProgressBuffer: document.getElementById('player-progress-buffer'),
  playerProgressFill: document.getElementById('player-progress-fill'),
  playerProgressThumb: document.getElementById('player-progress-thumb'),
  playerMuteBtn: document.getElementById('player-mute-btn'),
  playerVolumeSlider: document.getElementById('player-volume-slider'),
  toggleQueueBtn: document.getElementById('toggle-queue-btn'),

  // Desktop Queue
  queuePanel: document.getElementById('queue-panel'),
  queueCountLabel: document.getElementById('queue-count-label'),
  queueList: document.getElementById('queue-list'),
  clearQueueBtn: document.getElementById('clear-queue-btn'),

  // Mobile navigation
  mobileNav: document.getElementById('mobile-nav'),
  mobTabHome: document.getElementById('mob-tab-home'),
  mobTabSearch: document.getElementById('mob-tab-search'),
  mobTabLibrary: document.getElementById('mob-tab-library'),

  // Mobile Mini Player
  mobileMiniPlayer: document.getElementById('mobile-mini-player'),
  miniPlayerExpandBtn: document.getElementById('mini-player-expand-btn'),
  miniArtworkImg: document.getElementById('mini-artwork-img'),
  miniArtPlaceholder: document.getElementById('mini-art-placeholder'),
  miniTrackTitle: document.getElementById('mini-track-title'),
  miniTrackArtist: document.getElementById('mini-track-artist'),
  miniPlayPauseBtn: document.getElementById('mini-play-pause-btn'),
  miniNextBtn: document.getElementById('mini-next-btn'),
  miniProgressFill: document.getElementById('mini-progress-fill'),

  // Mobile Fullscreen Player
  mobileFullscreenPlayer: document.getElementById('mobile-fullscreen-player'),
  closeFullscreenBtn: document.getElementById('close-fullscreen-btn'),
  fullscreenQueueBtn: document.getElementById('fullscreen-queue-btn'),
  fullscreenArtworkImg: document.getElementById('fullscreen-artwork-img-element'),
  fullscreenArtPlaceholder: document.getElementById('fullscreen-art-placeholder'),
  fullscreenTrackTitleTxt: document.getElementById('fullscreen-track-title-txt'),
  fullscreenTrackArtistTxt: document.getElementById('fullscreen-track-artist-txt'),
  fullscreenLikeBtn: document.getElementById('fullscreen-like-btn'),
  fullscreenProgressContainer: document.getElementById('fullscreen-progress-container'),
  fullscreenProgressBuffer: document.getElementById('fullscreen-progress-buffer'),
  fullscreenProgressFill: document.getElementById('fullscreen-progress-fill'),
  fullscreenProgressThumb: document.getElementById('fullscreen-progress-thumb'),
  fullscreenTimeCurrent: document.getElementById('fullscreen-time-current'),
  fullscreenTimeDuration: document.getElementById('fullscreen-time-duration'),
  fullscreenPlayPauseBtn: document.getElementById('fullscreen-play-pause-btn'),
  fullscreenPrevBtn: document.getElementById('fullscreen-prev-btn'),
  fullscreenNextBtn: document.getElementById('fullscreen-next-btn'),
  fullscreenShuffleBtn: document.getElementById('fullscreen-shuffle-btn'),
  fullscreenRepeatBtn: document.getElementById('fullscreen-repeat-btn'),
  fullscreenMuteBtn: document.getElementById('fullscreen-mute-btn'),
  fullscreenVolumeSlider: document.getElementById('fullscreen-volume-slider'),

  // Overlays
  autoplayOverlay: document.getElementById('autoplay-overlay'),
  toastNotification: document.getElementById('toast-notification'),
  toastMessage: document.getElementById('toast-message')
};

// Supabase identification key (anonymous channel identifier)
const userId = 'user_' + Math.random().toString(36).substring(2, 9);
let player = null; // YouTube Player Instance
let isRepeatActive = false;
let isShuffleActive = false;
let lastRenderedTrackId = null;

// ==========================================================================
// 3. NAVIGATION ROUTER & ROUTE HISTORY
// ==========================================================================

function navigateToTab(tabName) {
  state.activeTab = tabName;
  state.activeSubPage = null;
  state.history = [];
  
  // Toggle search box inside header based on route
  if (tabName === 'search') {
    DOM.searchBarContainer.classList.remove('hidden');
    DOM.searchInput.focus();
  } else {
    DOM.searchBarContainer.classList.add('hidden');
  }

  updateSidebarActiveUI();
  updateHeaderNavigationUI();
  renderContentStage();
}

function navigateToSubPage(type, id) {
  // Push current subpage to history before swapping
  if (state.activeSubPage) {
    state.history.push({ ...state.activeSubPage });
  } else {
    state.history.push(null);
  }
  
  state.activeSubPage = { type, id };
  
  updateHeaderNavigationUI();
  renderContentStage();
}

function goBack() {
  if (state.history.length > 0) {
    const prevPage = state.history.pop();
    state.activeSubPage = prevPage;
    updateHeaderNavigationUI();
    renderContentStage();
  } else if (state.activeSubPage) {
    state.activeSubPage = null;
    updateHeaderNavigationUI();
    renderContentStage();
  }
}

function updateHeaderNavigationUI() {
  // Show or hide back arrow
  const canGoBack = state.activeSubPage !== null || state.history.length > 0;
  if (canGoBack) {
    DOM.navBackBtn.classList.remove('hidden');
  } else {
    DOM.navBackBtn.classList.add('hidden');
  }
}

function updateSidebarActiveUI() {
  // Desktop sidebar links highlight
  const navItems = [DOM.navHome, DOM.navSearch, DOM.navLibrary];
  navItems.forEach(item => {
    if (item.dataset.tab === state.activeTab && !state.activeSubPage) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Mobile bottom tab bar links highlight
  const mobTabs = [DOM.mobTabHome, DOM.mobTabSearch, DOM.mobTabLibrary];
  mobTabs.forEach(item => {
    if (item.dataset.tab === state.activeTab) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Sub section indicator clearing
  const subItems = [DOM.navSubPlaylists, DOM.navSubDecades, DOM.navSubArtists, DOM.navSubLiked];
  subItems.forEach(item => {
    if (state.activeSubPage && state.activeSubPage.type === item.dataset.sub) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// ==========================================================================
// 4. COMPONENT RENDERERS (POPULATING HTML STAGE)
// ==========================================================================

function renderContentStage() {
  // If subpage is active, route accordingly
  if (state.activeSubPage) {
    const { type, id } = state.activeSubPage;
    if (type === 'album') {
      renderAlbumDetailView(id);
    } else if (type === 'playlist') {
      renderPlaylistDetailView(id);
    } else if (type === 'liked') {
      renderLikedSongsView();
    } else if (type === 'playlists') {
      renderLibraryPlaylistsTab();
    } else if (type === 'decades') {
      renderLibraryDecadesTab();
    } else if (type === 'artists') {
      renderLibraryArtistsTab();
    } else if (type === 'player') {
      renderPlayerView();
    }
    return;
  }

  // Route base tabs
  if (state.activeTab === 'home') {
    renderHomeView();
  } else if (state.activeTab === 'search') {
    renderSearchView();
  } else if (state.activeTab === 'library') {
    renderLibraryView();
  }
}

// Home dashboard view
function renderHomeView() {
  // Get time-based greeting
  const hours = new Date().getHours();
  let greeting = 'Good Evening';
  if (hours < 12) greeting = 'Good Morning';
  else if (hours < 18) greeting = 'Good Afternoon';

  // Build grid of albums (limit to first 4)
  const albumKeys = Object.keys(ALBUMS);
  let albumsHTML = '';
  albumKeys.slice(0, 5).forEach(key => {
    const album = ALBUMS[key];
    albumsHTML += `
      <div class="album-card" onclick="navigateToSubPage('album', '${album.id}')">
        <div class="album-art-container">
          <span class="album-fallback-art">⚡</span>
          ${album.cover ? `<img src="${album.cover}" alt="${album.title}" class="album-art-image" loading="lazy">` : ''}
        </div>
        <div class="album-meta-title">${album.title}</div>
        <div class="album-meta-artist">${album.artist}</div>
      </div>
    `;
  });

  // Build grid of decades channel cards
  let decadesHTML = '';
  Object.keys(DECADE_PLAYLISTS).forEach(key => {
    const playlist = DECADE_PLAYLISTS[key];
    decadesHTML += `
      <div class="album-card" onclick="navigateToSubPage('playlist', '${playlist.id}')">
        <div class="album-art-container" style="background-color: #151515;">
          <span class="album-fallback-art" style="font-size: 1.5rem; color: #FFF; font-weight: 800;">
            ${playlist.title.split(' ')[0]}
          </span>
        </div>
        <div class="album-meta-title">${playlist.title}</div>
        <div class="album-meta-artist">Continuous Stream</div>
      </div>
    `;
  });

  DOM.contentStage.innerHTML = `
    <div class="view-max-width">
      <h1 class="editorial-title">${greeting}</h1>
      
      <div class="section-divider"></div>
      
      <h2 class="section-heading">Recently Played</h2>
      <div class="horizontal-scroll-row">
        ${albumsHTML}
      </div>
      
      <div class="section-divider"></div>
      
      <h2 class="section-heading">Decades Frequencies</h2>
      <div class="horizontal-scroll-row">
        ${decadesHTML}
      </div>
    </div>
  `;
}

// Search dashboard view
function renderSearchView() {
  const query = state.searchQuery.trim().toLowerCase();
  
  if (query === '') {
    // Show default search helper
    DOM.contentStage.innerHTML = `
      <div class="view-max-width" style="text-align: center; padding-top: 80px; color: var(--text-secondary);">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 16px; opacity: 0.5;">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <p style="font-size: 1.1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-primary);">Search Rock Archive</p>
        <p style="font-size: 0.85rem; margin-top: 6px;">Find classic rock, grunge, indie, and alternative favorites</p>
      </div>
    `;
    return;
  }

  // Filter songs, albums, and artists
  const filteredSongs = TRACKS_DB.filter(song => 
    song.title.toLowerCase().includes(query) || 
    song.artist.toLowerCase().includes(query) || 
    song.album.toLowerCase().includes(query)
  );

  const filteredAlbums = Object.values(ALBUMS).filter(album => 
    album.title.toLowerCase().includes(query) || 
    album.artist.toLowerCase().includes(query)
  );

  // Group unique artists matched
  const artistNamesMatched = new Set();
  TRACKS_DB.forEach(song => {
    if (song.artist.toLowerCase().includes(query)) {
      artistNamesMatched.add(song.artist);
    }
  });
  const filteredArtists = Array.from(artistNamesMatched);

  // Determine top result
  let topResultHTML = '';
  if (filteredSongs.length > 0) {
    const topSong = filteredSongs[0];
    topResultHTML = `
      <div class="top-result-card" onclick="playSongDirectly('${topSong.id}')">
        <div class="top-result-art">
          <span style="color: var(--text-secondary);">⚡</span>
          ${topSong.cover ? `<img src="${topSong.cover}" alt="cover">` : ''}
        </div>
        <div class="top-result-title">${topSong.title}</div>
        <div style="font-size: 0.88rem; color: var(--text-secondary); font-weight: 600;">${topSong.artist}</div>
        <div class="top-result-type-tag">Song</div>
      </div>
    `;
  } else if (filteredAlbums.length > 0) {
    const topAlbum = filteredAlbums[0];
    topResultHTML = `
      <div class="top-result-card" onclick="navigateToSubPage('album', '${topAlbum.id}')">
        <div class="top-result-art">
          <span>⚡</span>
          ${topAlbum.cover ? `<img src="${topAlbum.cover}" alt="cover">` : ''}
        </div>
        <div class="top-result-title">${topAlbum.title}</div>
        <div style="font-size: 0.88rem; color: var(--text-secondary); font-weight: 600;">${topAlbum.artist}</div>
        <div class="top-result-type-tag">Album</div>
      </div>
    `;
  } else {
    topResultHTML = `<div style="color: var(--text-secondary); font-size: 0.9rem;">No direct match found</div>`;
  }

  // Build Songs list html
  let songsHTML = '';
  if (filteredSongs.length > 0) {
    songsHTML = `
      <div class="track-list">
        <div class="track-list-header">
          <div class="col-num">#</div>
          <div class="col-title">Title</div>
          <div class="col-album">Album</div>
          <div class="col-time">Time</div>
        </div>
    `;
    filteredSongs.slice(0, 5).forEach((song, idx) => {
      const activeClass = state.currentTrack && state.currentTrack.id === song.id ? 'active' : '';
      songsHTML += `
        <div class="track-row ${activeClass}" onclick="playSongDirectly('${song.id}')">
          <div class="col-num track-row-num">${idx + 1}</div>
          <div class="col-title">
            <div class="track-row-title-container">
              <span class="track-row-title">${song.title}</span>
              <span class="track-row-artist">${song.artist}</span>
            </div>
          </div>
          <div class="col-album track-row-album">${song.album}</div>
          <div class="col-time track-row-time">${song.duration}</div>
        </div>
      `;
    });
    songsHTML += `</div>`;
  } else {
    songsHTML = `<div style="color: var(--text-secondary); padding: 12px 16px; font-size: 0.9rem;">No songs match search</div>`;
  }

  // Build Albums grid HTML
  let albumsHTML = '';
  if (filteredAlbums.length > 0) {
    albumsHTML = `<div class="responsive-grid">`;
    filteredAlbums.forEach(album => {
      albumsHTML += `
        <div class="album-card" onclick="navigateToSubPage('album', '${album.id}')">
          <div class="album-art-container">
            <span class="album-fallback-art">⚡</span>
            ${album.cover ? `<img src="${album.cover}" alt="${album.title}" class="album-art-image">` : ''}
          </div>
          <div class="album-meta-title">${album.title}</div>
          <div class="album-meta-artist">${album.artist}</div>
        </div>
      `;
    });
    albumsHTML += `</div>`;
  } else {
    albumsHTML = `<div style="color: var(--text-secondary); padding: 12px 16px; font-size: 0.9rem;">No albums match search</div>`;
  }

  DOM.contentStage.innerHTML = `
    <div class="view-max-width search-view-grid">
      <div style="display: grid; grid-template-columns: 1fr; gap: 32px;">
        <div>
          <h2 class="section-heading">Top Result</h2>
          ${topResultHTML}
        </div>
      </div>
      
      <div class="section-divider"></div>
      
      <div>
        <h2 class="section-heading">Songs</h2>
        ${songsHTML}
      </div>
      
      <div class="section-divider"></div>
      
      <div>
        <h2 class="section-heading">Albums</h2>
        ${albumsHTML}
      </div>
    </div>
  `;
}

// Library main tabs router view
function renderLibraryView() {
  renderLibraryPlaylistsTab();
}

function renderLibraryPlaylistsTab() {
  updateSidebarActiveUI();
  
  // Custom playlists + decades
  let playlistsHTML = '';
  // Liked songs playlist card
  playlistsHTML += `
    <div class="album-card" onclick="navigateToSubPage('liked', 'liked')">
      <div class="album-art-container" style="background-color: var(--surface-primary); border-color: var(--text-secondary);">
        <span class="album-fallback-art" style="color: var(--accent-white); font-size: 2rem;">♡</span>
      </div>
      <div class="album-meta-title">Liked Songs</div>
      <div class="album-meta-artist">${state.likedSongs.size} Songs</div>
    </div>
  `;

  Object.keys(DECADE_PLAYLISTS).forEach(key => {
    const pl = DECADE_PLAYLISTS[key];
    playlistsHTML += `
      <div class="album-card" onclick="navigateToSubPage('playlist', '${pl.id}')">
        <div class="album-art-container" style="background-color: var(--surface-primary);">
          <span class="album-fallback-art" style="font-size: 1.4rem;">⚡</span>
        </div>
        <div class="album-meta-title">${pl.title}</div>
        <div class="album-meta-artist">${pl.tracks.length} Songs</div>
      </div>
    `;
  });

  DOM.contentStage.innerHTML = `
    <div class="view-max-width">
      <h1 class="editorial-title">Your Library</h1>
      
      <!-- Library Tabs header -->
      <div class="library-tabs-header" style="display: flex; gap: 24px; border-bottom: 1px solid var(--border-subtle); margin-bottom: 24px; padding-bottom: 8px;">
        <button class="lib-tab active" onclick="renderLibraryPlaylistsTab()" style="font-weight: 800; font-size: 0.9rem; text-transform: uppercase; color: var(--accent-white);">Playlists</button>
        <button class="lib-tab" onclick="renderLibraryDecadesTab()" style="font-weight: 800; font-size: 0.9rem; text-transform: uppercase; color: var(--text-secondary);">Decades</button>
        <button class="lib-tab" onclick="renderLibraryArtistsTab()" style="font-weight: 800; font-size: 0.9rem; text-transform: uppercase; color: var(--text-secondary);">Artists</button>
      </div>

      <div class="responsive-grid">
        ${playlistsHTML}
      </div>
    </div>
  `;
}

function renderLibraryDecadesTab() {
  updateSidebarActiveUI();

  let decadesHTML = '';
  Object.keys(DECADE_PLAYLISTS).forEach(key => {
    const pl = DECADE_PLAYLISTS[key];
    decadesHTML += `
      <div class="album-card" onclick="navigateToSubPage('playlist', '${pl.id}')">
        <div class="album-art-container" style="background-color: var(--surface-primary);">
          <span class="album-fallback-art" style="font-size: 1.4rem;">⚡</span>
        </div>
        <div class="album-meta-title">${pl.title}</div>
        <div class="album-meta-artist">Continuous Stream • ${pl.tracks.length} Songs</div>
      </div>
    `;
  });

  DOM.contentStage.innerHTML = `
    <div class="view-max-width">
      <h1 class="editorial-title">Your Library</h1>
      
      <div class="library-tabs-header" style="display: flex; gap: 24px; border-bottom: 1px solid var(--border-subtle); margin-bottom: 24px; padding-bottom: 8px;">
        <button class="lib-tab" onclick="renderLibraryPlaylistsTab()" style="font-weight: 800; font-size: 0.9rem; text-transform: uppercase; color: var(--text-secondary);">Playlists</button>
        <button class="lib-tab active" onclick="renderLibraryDecadesTab()" style="font-weight: 800; font-size: 0.9rem; text-transform: uppercase; color: var(--accent-white);">Decades</button>
        <button class="lib-tab" onclick="renderLibraryArtistsTab()" style="font-weight: 800; font-size: 0.9rem; text-transform: uppercase; color: var(--text-secondary);">Artists</button>
      </div>

      <div class="responsive-grid">
        ${decadesHTML}
      </div>
    </div>
  `;
}

function renderLibraryArtistsTab() {
  updateSidebarActiveUI();

  // Find unique artists in database
  const artists = Array.from(new Set(TRACKS_DB.map(t => t.artist)));
  let artistsHTML = '';
  artists.forEach(artist => {
    const songCount = TRACKS_DB.filter(t => t.artist === artist).length;
    artistsHTML += `
      <div class="album-card" onclick="navigateToSubPage('artists', '${encodeURIComponent(artist)}')">
        <div class="album-art-container" style="border-radius: 50%;">
          <span class="album-fallback-art">⚡</span>
        </div>
        <div class="album-meta-title" style="text-align: center;">${artist}</div>
        <div class="album-meta-artist" style="text-align: center;">Artist • ${songCount} Tracks</div>
      </div>
    `;
  });

  DOM.contentStage.innerHTML = `
    <div class="view-max-width">
      <h1 class="editorial-title">Your Library</h1>
      
      <div class="library-tabs-header" style="display: flex; gap: 24px; border-bottom: 1px solid var(--border-subtle); margin-bottom: 24px; padding-bottom: 8px;">
        <button class="lib-tab" onclick="renderLibraryPlaylistsTab()" style="font-weight: 800; font-size: 0.9rem; text-transform: uppercase; color: var(--text-secondary);">Playlists</button>
        <button class="lib-tab" onclick="renderLibraryDecadesTab()" style="font-weight: 800; font-size: 0.9rem; text-transform: uppercase; color: var(--text-secondary);">Decades</button>
        <button class="lib-tab active" onclick="renderLibraryArtistsTab()" style="font-weight: 800; font-size: 0.9rem; text-transform: uppercase; color: var(--accent-white);">Artists</button>
      </div>

      <div class="responsive-grid">
        ${artistsHTML}
      </div>
    </div>
  `;
}

// Album details page component
function renderAlbumDetailView(albumId) {
  const album = ALBUMS[albumId];
  if (!album) return;

  let tracksHTML = '';
  album.tracks.forEach((track, index) => {
    const activeClass = state.currentTrack && state.currentTrack.id === track.id ? 'active' : '';
    tracksHTML += `
      <div class="track-row ${activeClass}" onclick="playAlbumTrack('${albumId}', ${index})">
        <div class="col-num track-row-num">${index + 1}</div>
        <div class="col-title">
          <div class="track-row-title-container">
            <span class="track-row-title">${track.title}</span>
            <span class="track-row-artist">${track.artist}</span>
          </div>
        </div>
        <div class="col-time track-row-time">${track.duration}</div>
      </div>
    `;
  });

  DOM.contentStage.innerHTML = `
    <div class="view-max-width">
      <div class="album-details-hero">
        <div class="hero-art-frame">
          <span class="hero-art-placeholder">⚡</span>
          ${album.cover ? `<img src="${album.cover}" alt="${album.title}" class="hero-art-img">` : ''}
        </div>
        <div class="hero-info">
          <span class="hero-eyebrow">Album</span>
          <h1 class="hero-title">${album.title}</h1>
          <div class="hero-meta">
            <span>${album.artist}</span>
            <span class="meta-bullet">•</span>
            <span>${album.year}</span>
            <span class="meta-bullet">•</span>
            <span>${album.tracks.length} Songs</span>
          </div>
          <div class="hero-actions">
            <button class="btn-accent" onclick="playAlbumTrack('${albumId}', 0)">Play</button>
            <button class="btn-secondary" onclick="shuffleAlbumPlay('${albumId}')">Shuffle</button>
          </div>
        </div>
      </div>

      <div class="track-list">
        <div class="track-list-header">
          <div class="col-num">#</div>
          <div class="col-title">Title</div>
          <div class="col-time">Time</div>
        </div>
        ${tracksHTML}
      </div>
    </div>
  `;
}

// Playlist details view component (Decades streams)
function renderPlaylistDetailView(playlistId) {
  const playlist = DECADE_PLAYLISTS[playlistId];
  if (!playlist) return;

  let tracksHTML = '';
  playlist.tracks.forEach((track, index) => {
    const activeClass = state.currentTrack && state.currentTrack.id === track.id ? 'active' : '';
    tracksHTML += `
      <div class="track-row ${activeClass}" onclick="playPlaylistTrack('${playlistId}', ${index})">
        <div class="col-num track-row-num">${index + 1}</div>
        <div class="col-title">
          <div class="track-row-title-container">
            <span class="track-row-title">${track.title}</span>
            <span class="track-row-artist">${track.artist}</span>
          </div>
        </div>
        <div class="col-album track-row-album">${track.album}</div>
        <div class="col-time track-row-time">${track.duration}</div>
      </div>
    `;
  });

  DOM.contentStage.innerHTML = `
    <div class="view-max-width">
      <div class="album-details-hero">
        <div class="hero-art-frame" style="background-color: #181818;">
          <span class="hero-art-placeholder" style="font-size: 2.2rem;">⚡</span>
        </div>
        <div class="hero-info">
          <span class="hero-eyebrow">Playlist</span>
          <h1 class="hero-title">${playlist.title}</h1>
          <div style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 12px; font-weight: 500;">${playlist.desc}</div>
          <div class="hero-meta">
            <span>RADIO ROCK Curated</span>
            <span class="meta-bullet">•</span>
            <span>${playlist.tracks.length} Songs</span>
          </div>
          <div class="hero-actions">
            <button class="btn-accent" onclick="playPlaylistTrack('${playlistId}', 0)">Play Channel</button>
          </div>
        </div>
      </div>

      <div class="track-list">
        <div class="track-list-header">
          <div class="col-num">#</div>
          <div class="col-title">Title</div>
          <div class="col-album">Album</div>
          <div class="col-time">Time</div>
        </div>
        ${tracksHTML}
      </div>
    </div>
  `;
}

// Liked songs view
function renderLikedSongsView() {
  updateSidebarActiveUI();
  const likedTracks = TRACKS_DB.filter(track => state.likedSongs.has(track.id));

  let tracksHTML = '';
  if (likedTracks.length > 0) {
    likedTracks.forEach((track, index) => {
      const activeClass = state.currentTrack && state.currentTrack.id === track.id ? 'active' : '';
      tracksHTML += `
        <div class="track-row ${activeClass}" onclick="playLikedTrack(${index})">
          <div class="col-num track-row-num">${index + 1}</div>
          <div class="col-title">
            <div class="track-row-title-container">
              <span class="track-row-title">${track.title}</span>
              <span class="track-row-artist">${track.artist}</span>
            </div>
          </div>
          <div class="col-album track-row-album">${track.album}</div>
          <div class="col-time track-row-time">${track.duration}</div>
        </div>
      `;
    });
  } else {
    tracksHTML = `<div style="color: var(--text-secondary); padding: 32px 16px; text-align: center; font-size: 0.95rem;">No liked songs yet. Tap ♡ on any track.</div>`;
  }

  DOM.contentStage.innerHTML = `
    <div class="view-max-width">
      <div class="album-details-hero">
        <div class="hero-art-frame" style="border-color: var(--text-secondary);">
          <span class="hero-art-placeholder" style="font-size: 3rem;">♡</span>
        </div>
        <div class="hero-info">
          <span class="hero-eyebrow">Playlist</span>
          <h1 class="hero-title">Liked Songs</h1>
          <div class="hero-meta">
            <span>Your Collection</span>
            <span class="meta-bullet">•</span>
            <span>${likedTracks.length} Songs</span>
          </div>
          ${likedTracks.length > 0 ? `<div class="hero-actions"><button class="btn-accent" onclick="playLikedTrack(0)">Play All</button></div>` : ''}
        </div>
      </div>

      <div class="track-list">
        <div class="track-list-header">
          <div class="col-num">#</div>
          <div class="col-title">Title</div>
          <div class="col-album">Album</div>
          <div class="col-time">Time</div>
        </div>
        ${tracksHTML}
      </div>
    </div>
  `;
}

// Artist detail view component (curated subset page)
function renderArtistDetailView(artistName) {
  const decodedArtist = decodeURIComponent(artistName);
  const artistTracks = TRACKS_DB.filter(t => t.artist === decodedArtist);
  const artistAlbums = Object.values(ALBUMS).filter(a => a.artist === decodedArtist);

  let tracksHTML = '';
  artistTracks.forEach((track, index) => {
    const activeClass = state.currentTrack && state.currentTrack.id === track.id ? 'active' : '';
    tracksHTML += `
      <div class="track-row ${activeClass}" onclick="playArtistTrack('${artistName}', ${index})">
        <div class="col-num track-row-num">${index + 1}</div>
        <div class="col-title">
          <div class="track-row-title-container">
            <span class="track-row-title">${track.title}</span>
            <span class="track-row-artist">${track.artist}</span>
          </div>
        </div>
        <div class="col-album track-row-album">${track.album}</div>
        <div class="col-time track-row-time">${track.duration}</div>
      </div>
    `;
  });

  let albumsHTML = '';
  artistAlbums.forEach(album => {
    albumsHTML += `
      <div class="album-card" onclick="navigateToSubPage('album', '${album.id}')">
        <div class="album-art-container">
          <span class="album-fallback-art">⚡</span>
          ${album.cover ? `<img src="${album.cover}" alt="${album.title}" class="album-art-image">` : ''}
        </div>
        <div class="album-meta-title">${album.title}</div>
        <div class="album-meta-artist">${album.year}</div>
      </div>
    `;
  });

  DOM.contentStage.innerHTML = `
    <div class="view-max-width">
      <div class="album-details-hero">
        <div class="hero-art-frame" style="border-radius: 50%;">
          <span class="hero-art-placeholder">⚡</span>
        </div>
        <div class="hero-info">
          <span class="hero-eyebrow">Artist</span>
          <h1 class="hero-title">${decodedArtist}</h1>
          <div class="hero-meta">
            <span>Verified Rock Legend</span>
            <span class="meta-bullet">•</span>
            <span>${artistTracks.length} tracks catalogued</span>
          </div>
        </div>
      </div>

      <h2 class="section-heading">Popular Songs</h2>
      <div class="track-list">
        ${tracksHTML}
      </div>

      <div class="section-divider"></div>

      <h2 class="section-heading">Albums</h2>
      <div class="responsive-grid">
        ${albumsHTML}
      </div>
    </div>
  `;
}

// Dedicated single track templated player view
function renderPlayerView() {
  const track = state.currentTrack;
  if (!track) {
    DOM.contentStage.innerHTML = `
      <div class="view-max-width" style="text-align: center; padding-top: 80px;">
        <h2 class="editorial-title">No Track Active</h2>
        <p style="color: var(--text-secondary);">Select a song from Home or Library to begin.</p>
      </div>
    `;
    return;
  }

  // Set the rendered track ID to avoid rebuild flickering
  lastRenderedTrackId = track.id;

  // Get next 3 songs in queue
  let upNextHTML = '';
  const startIndex = state.queueIndex + 1;
  const upNextTracks = state.queue.slice(startIndex, startIndex + 3);
  if (upNextTracks.length > 0) {
    upNextHTML += `
      <h3 class="section-heading" style="margin-top: 40px; border-top: 1px solid var(--border-subtle); padding-top: 24px;">Up Next</h3>
      <div style="display: flex; flex-direction: column; gap: 4px;">
    `;
    upNextTracks.forEach((t, i) => {
      upNextHTML += `
        <div class="queue-item" onclick="playTrack(state.queue[${startIndex + i}], ${startIndex + i})">
          <div class="queue-item-index">${startIndex + i + 1}</div>
          <div class="queue-item-meta">
            <div class="queue-item-title">${t.title}</div>
            <div class="queue-item-artist">${t.artist}</div>
          </div>
          <div class="queue-item-time">${t.duration}</div>
        </div>
      `;
    });
    upNextHTML += `</div>`;
  }

  // Render the dedicated large player view layout
  DOM.contentStage.innerHTML = `
    <div class="view-max-width" style="display: flex; flex-direction: column; align-items: center; max-width: 520px; margin: 0 auto; text-align: center;">
      <!-- Large album artwork -->
      <div class="stage-artwork-card" style="width: 100%; aspect-ratio: 1; background-color: var(--surface-primary); border: 1px solid var(--border-subtle); border-radius: 6px; overflow: hidden; display: flex; align-items: center; justify-content: center; position: relative;">
        <span style="font-size: 4rem; color: var(--text-secondary); font-weight: 900; position: absolute; z-index: 1;">⚡</span>
        ${track.cover ? `<img src="${track.cover}" alt="${track.title}" style="width:100%; height:100%; object-fit:cover; filter: grayscale(1); position: relative; z-index: 2;" id="stage-artwork-img">` : ''}
      </div>

      <!-- Title / Artist metadata -->
      <div style="margin-top: 28px; width: 100%;">
        <h1 class="editorial-title" style="font-size: 2.2rem; margin-bottom: 8px;">${track.title}</h1>
        <p style="font-size: 1.1rem; font-weight: 600; color: var(--text-secondary);">${track.artist}</p>
      </div>

      <!-- Scrubber -->
      <div style="width: 100%; margin-top: 24px; display: flex; flex-direction: column; gap: 8px;">
        <div class="timeline-slider-container" id="stage-progress-container" role="slider" aria-label="Playback Slider" tabindex="0">
          <div class="timeline-track">
            <div class="timeline-buffer" id="stage-progress-buffer"></div>
            <div class="timeline-fill" id="stage-progress-fill"></div>
            <div class="timeline-thumb" id="stage-progress-thumb"></div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.72rem; font-weight: 600; color: var(--text-secondary);">
          <span id="stage-time-current">0:00</span>
          <span id="stage-time-duration">-0:00</span>
        </div>
      </div>

      <!-- Playback Controls -->
      <div style="display: flex; align-items: center; justify-content: center; gap: 32px; width: 100%; margin-top: 20px;">
        <button class="player-icon-btn ${isShuffleActive ? 'active' : ''}" id="stage-shuffle-btn" style="width:40px; height:40px;">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line>
          </svg>
        </button>
        <button class="player-icon-btn" id="stage-prev-btn" style="width:44px; height:44px;">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="4" x2="5" y2="20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"></line></svg>
        </button>
        <button class="player-play-btn" id="stage-play-pause-btn" style="width:56px; height:56px; background-color: var(--accent-white); color: var(--bg-deep); display: flex; align-items: center; justify-content: center;">
          <svg class="play-icon ${state.isPlaying ? 'hidden' : ''}" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>
          <svg class="pause-icon ${state.isPlaying ? '' : 'hidden'}" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>
        </button>
        <button class="player-icon-btn" id="stage-next-btn" style="width:44px; height:44px;">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="4" x2="19" y2="20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"></line></svg>
        </button>
        <button class="player-icon-btn ${isRepeatActive ? 'active' : ''}" id="stage-repeat-btn" style="width:40px; height:40px;">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
          </svg>
        </button>
      </div>

      <!-- Song details template -->
      <div style="width: 100%; border-top: 1px solid var(--border-subtle); margin-top: 36px; padding-top: 24px; text-align: left;">
        <h3 class="section-heading" style="margin-bottom: 16px;">Record Specs</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.85rem; font-weight: 500; color: var(--text-secondary);">
          <div>ALBUM</div><div style="color: var(--text-primary); text-align: right;">${track.album}</div>
          <div>RELEASE YEAR</div><div style="color: var(--text-primary); text-align: right;">${track.year}</div>
          <div>DECADE ERA</div><div style="color: var(--text-primary); text-align: right;">${track.decade.toUpperCase()} CLASSIC</div>
          <div>AUDIO SOURCE</div><div style="color: var(--text-primary); text-align: right;">YouTube Stream (${track.youtubeId})</div>
          <div>LENGTH</div><div style="color: var(--text-primary); text-align: right;">${track.duration}</div>
        </div>
      </div>

      <!-- Up next queue list -->
      <div style="width: 100%; text-align: left;">
        ${upNextHTML}
      </div>
    </div>
  `;

  // Bind scrubber slider
  const stageScroller = document.getElementById('stage-progress-container');
  bindScrubberEvents(stageScroller);

  // Bind controls
  document.getElementById('stage-play-pause-btn').addEventListener('click', togglePlay);
  document.getElementById('stage-prev-btn').addEventListener('click', playPrevTrack);
  document.getElementById('stage-next-btn').addEventListener('click', playNextTrack);
  
  document.getElementById('stage-shuffle-btn').addEventListener('click', () => {
    isShuffleActive = !isShuffleActive;
    document.getElementById('stage-shuffle-btn').classList.toggle('active', isShuffleActive);
    DOM.playerShuffleBtn.classList.toggle('active', isShuffleActive);
    DOM.fullscreenShuffleBtn.classList.toggle('active', isShuffleActive);
    showToast(isShuffleActive ? 'Shuffle Enabled' : 'Shuffle Disabled');
  });

  document.getElementById('stage-repeat-btn').addEventListener('click', () => {
    isRepeatActive = !isRepeatActive;
    document.getElementById('stage-repeat-btn').classList.toggle('active', isRepeatActive);
    DOM.playerRepeatBtn.classList.toggle('active', isRepeatActive);
    DOM.fullscreenRepeatBtn.classList.toggle('active', isRepeatActive);
    showToast(isRepeatActive ? 'Repeat Enabled' : 'Repeat Disabled');
  });
}

// Overwrite navigation routing when routing to arbitrary pages
const originalNavigateToSubPage = navigateToSubPage;
navigateToSubPage = function(type, id) {
  if (type === 'artists') {
    renderArtistDetailView(id);
    state.activeSubPage = { type, id };
    updateHeaderNavigationUI();
    return;
  }
  originalNavigateToSubPage(type, id);
};

// ==========================================================================
// 5. PLAYBACK CONTROLLER & QUEUE MANAGEMENT
// ==========================================================================

function playTrack(track, index, customQueue = null) {
  if (!track) return;
  state.userHasInteracted = true;
  hideAutoplayPrompt();

  if (customQueue) {
    state.queue = [...customQueue];
  }
  state.queueIndex = index;
  state.currentTrack = track;
  state.isPlaying = true;

  // Render elements immediately
  syncPlaybackUI();

  // Load into YouTube
  if (player && state.isPlayerReady) {
    try {
      player.loadVideoById({
        videoId: track.youtubeId,
        startSeconds: 0
      });
      // Ensure player loops to next track on finish
      player.setLoop(false); 
    } catch (e) {
      console.warn('YT direct play failed, loading fallback:', e);
    }
  }
  
  // Show mobile mini-player
  DOM.mobileMiniPlayer.classList.remove('hidden');
}

function playSongDirectly(songId) {
  const track = TRACKS_DB.find(t => t.id === songId);
  if (track) {
    playTrack(track, 0, [track]);
  }
}

function playAlbumTrack(albumId, index) {
  const album = ALBUMS[albumId];
  if (album && album.tracks[index]) {
    playTrack(album.tracks[index], index, album.tracks);
  }
}

function shuffleAlbumPlay(albumId) {
  const album = ALBUMS[albumId];
  if (album && album.tracks.length > 0) {
    const shuffled = [...album.tracks].sort(() => Math.random() - 0.5);
    playTrack(shuffled[0], 0, shuffled);
  }
}

function playPlaylistTrack(playlistId, index) {
  const playlist = DECADE_PLAYLISTS[playlistId];
  if (playlist && playlist.tracks[index]) {
    playTrack(playlist.tracks[index], index, playlist.tracks);
  }
}

function playArtistTrack(artistName, index) {
  const decodedArtist = decodeURIComponent(artistName);
  const artistTracks = TRACKS_DB.filter(t => t.artist === decodedArtist);
  if (artistTracks[index]) {
    playTrack(artistTracks[index], index, artistTracks);
  }
}

function playLikedTrack(index) {
  const likedTracks = TRACKS_DB.filter(track => state.likedSongs.has(track.id));
  if (likedTracks[index]) {
    playTrack(likedTracks[index], index, likedTracks);
  }
}

function playNextTrack() {
  if (state.queue.length === 0) return;
  
  let nextIdx = state.queueIndex + 1;
  if (isShuffleActive) {
    nextIdx = Math.floor(Math.random() * state.queue.length);
  }

  if (nextIdx < state.queue.length) {
    playTrack(state.queue[nextIdx], nextIdx);
  } else if (isRepeatActive) {
    // Loop back to start
    playTrack(state.queue[0], 0);
  } else {
    state.isPlaying = false;
    if (player && state.isPlayerReady) player.pauseVideo();
    syncPlaybackUI();
  }
}

function playPrevTrack() {
  if (state.queue.length === 0) return;
  
  let prevIdx = state.queueIndex - 1;
  if (prevIdx >= 0) {
    playTrack(state.queue[prevIdx], prevIdx);
  } else {
    // Wrap to end
    const lastIdx = state.queue.length - 1;
    playTrack(state.queue[lastIdx], lastIdx);
  }
}

function togglePlay() {
  if (!state.currentTrack) {
    // If nothing playing, play first song in DB
    playTrack(TRACKS_DB[0], 0, TRACKS_DB);
    return;
  }

  state.isPlaying = !state.isPlaying;
  syncPlaybackUI();

  if (player && state.isPlayerReady) {
    try {
      if (state.isPlaying) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    } catch (err) {
      console.warn('YT player toggle failed:', err);
    }
  }
}

// Volume controllers
function setVolume(val) {
  state.currentVolume = parseInt(val, 10);
  if (player && state.isPlayerReady) {
    try {
      if (state.currentVolume === 0) {
        player.mute();
        state.isMuted = true;
      } else {
        player.unMute();
        player.setVolume(state.currentVolume);
        state.isMuted = false;
      }
    } catch (e) {
      console.warn(e);
    }
  }
  syncVolumeUI();
}

function toggleMute() {
  state.isMuted = !state.isMuted;
  if (player && state.isPlayerReady) {
    try {
      if (state.isMuted) {
        player.mute();
      } else {
        player.unMute();
        player.setVolume(state.currentVolume || 100);
      }
    } catch (e) {
      console.warn(e);
    }
  }
  syncVolumeUI();
}

// Like toggle controller
function toggleLikeTrack(trackId) {
  if (state.likedSongs.has(trackId)) {
    state.likedSongs.delete(trackId);
    showToast('Removed from Liked Songs');
  } else {
    state.likedSongs.add(trackId);
    showToast('Added to Liked Songs ♡');
  }
  syncPlaybackUI();
  
  // Re-render active subpage if we are viewing liked list currently
  if (state.activeSubPage && state.activeSubPage.type === 'liked') {
    renderLikedSongsView();
  }
}

// Queue clearing
function clearQueue() {
  state.queue = [];
  state.queueIndex = -1;
  renderQueueList();
  showToast('Queue Cleared');
}

// ==========================================================================
// 6. SYNC PLAYBACK & VIEWS UI CONTROLS
// ==========================================================================

function syncPlaybackUI() {
  const track = state.currentTrack;
  if (!track) return;

  // 1. Desktop Bottom Player sync
  DOM.playerTrackTitle.textContent = track.title;
  DOM.playerTrackArtist.textContent = track.artist;
  if (track.cover) {
    DOM.playerArtworkImg.src = track.cover;
    DOM.playerArtworkImg.classList.remove('hidden');
    DOM.playerArtPlaceholder.classList.add('hidden');
  } else {
    DOM.playerArtworkImg.classList.add('hidden');
    DOM.playerArtPlaceholder.classList.remove('hidden');
  }

  // Play Pause Icon triggers
  if (state.isPlaying) {
    DOM.playerPlayPauseBtn.querySelector('.play-icon').classList.add('hidden');
    DOM.playerPlayPauseBtn.querySelector('.pause-icon').classList.remove('hidden');
  } else {
    DOM.playerPlayPauseBtn.querySelector('.play-icon').classList.remove('hidden');
    DOM.playerPlayPauseBtn.querySelector('.pause-icon').classList.add('hidden');
  }

  // Like status
  const isLiked = state.likedSongs.has(track.id);
  const outlineLike = DOM.playerLikeBtn.querySelector('.heart-icon.outline');
  const filledLike = DOM.playerLikeBtn.querySelector('.heart-icon.filled');
  if (isLiked) {
    outlineLike.classList.add('hidden');
    filledLike.classList.remove('hidden');
  } else {
    outlineLike.classList.remove('hidden');
    filledLike.classList.add('hidden');
  }

  // 2. Mobile Mini Player sync
  DOM.miniTrackTitle.textContent = track.title;
  DOM.miniTrackArtist.textContent = track.artist;
  if (track.cover) {
    DOM.miniArtworkImg.src = track.cover;
    DOM.miniArtworkImg.classList.remove('hidden');
    DOM.miniArtPlaceholder.classList.add('hidden');
  } else {
    DOM.miniArtworkImg.classList.add('hidden');
    DOM.miniArtPlaceholder.classList.remove('hidden');
  }

  if (state.isPlaying) {
    DOM.miniPlayPauseBtn.querySelector('.play-icon').classList.add('hidden');
    DOM.miniPlayPauseBtn.querySelector('.pause-icon').classList.remove('hidden');
  } else {
    DOM.miniPlayPauseBtn.querySelector('.play-icon').classList.remove('hidden');
    DOM.miniPlayPauseBtn.querySelector('.pause-icon').classList.add('hidden');
  }

  // 3. Mobile Fullscreen Player sync
  DOM.fullscreenTrackTitleTxt.textContent = track.title;
  DOM.fullscreenTrackArtistTxt.textContent = track.artist;
  if (track.cover) {
    DOM.fullscreenArtworkImg.src = track.cover;
    DOM.fullscreenArtworkImg.classList.remove('hidden');
    DOM.fullscreenArtPlaceholder.classList.add('hidden');
  } else {
    DOM.fullscreenArtworkImg.classList.add('hidden');
    DOM.fullscreenArtPlaceholder.classList.remove('hidden');
  }

  if (state.isPlaying) {
    DOM.fullscreenPlayPauseBtn.querySelector('.play-icon').classList.add('hidden');
    DOM.fullscreenPlayPauseBtn.querySelector('.pause-icon').classList.remove('hidden');
  } else {
    DOM.fullscreenPlayPauseBtn.querySelector('.play-icon').classList.remove('hidden');
    DOM.fullscreenPlayPauseBtn.querySelector('.pause-icon').classList.add('hidden');
  }

  const fOutlineLike = DOM.fullscreenLikeBtn.querySelector('.heart-icon.outline');
  const fFilledLike = DOM.fullscreenLikeBtn.querySelector('.heart-icon.filled');
  if (isLiked) {
    fOutlineLike.classList.add('hidden');
    fFilledLike.classList.remove('hidden');
  } else {
    fOutlineLike.classList.remove('hidden');
    fFilledLike.classList.add('hidden');
  }

  // If large player page is active, update play/pause state of stage controls
  const stagePlayPauseBtn = document.getElementById('stage-play-pause-btn');
  if (stagePlayPauseBtn) {
    if (state.isPlaying) {
      stagePlayPauseBtn.querySelector('.play-icon').classList.add('hidden');
      stagePlayPauseBtn.querySelector('.pause-icon').classList.remove('hidden');
    } else {
      stagePlayPauseBtn.querySelector('.play-icon').classList.remove('hidden');
      stagePlayPauseBtn.querySelector('.pause-icon').classList.add('hidden');
    }
  }

  // If the active page is the large player view, re-render it if track changes
  if (state.activeSubPage && state.activeSubPage.type === 'player') {
    if (lastRenderedTrackId !== track.id) {
      renderPlayerView();
    }
  }

  // Highlight active tracks inside content stage lists
  const rows = document.querySelectorAll('.track-row');
  rows.forEach(row => {
    // If it is playing this song, highlight
    const titleText = row.querySelector('.track-row-title')?.textContent;
    if (titleText === track.title) {
      row.classList.add('active');
    } else {
      row.classList.remove('active');
    }
  });

  // Re-render Queue List to reflect playing track highlight
  renderQueueList();
}

function syncVolumeUI() {
  const vol = state.isMuted ? 0 : state.currentVolume;
  
  DOM.playerVolumeSlider.value = vol;
  DOM.fullscreenVolumeSlider.value = vol;

  // Toggle mute icons
  const volWaves = DOM.playerMuteBtn.querySelectorAll('.vol-wave');
  if (vol === 0) {
    volWaves.forEach(w => w.style.opacity = '0.15');
    DOM.fullscreenMuteBtn.querySelector('svg').style.opacity = '0.3';
  } else {
    volWaves.forEach(w => w.style.opacity = '1');
    DOM.fullscreenMuteBtn.querySelector('svg').style.opacity = '1';
  }
}

function renderQueueList() {
  DOM.queueCountLabel.textContent = `${state.queue.length} SONGS`;
  
  if (state.queue.length === 0) {
    DOM.queueList.innerHTML = `<div style="padding: 24px 0; color: var(--text-secondary); font-size: 0.8rem; text-align: center;">Queue is empty</div>`;
    return;
  }

  let listHTML = '';
  state.queue.forEach((track, index) => {
    const activeClass = state.currentTrack && state.currentTrack.id === track.id && state.queueIndex === index ? 'active' : '';
    listHTML += `
      <div class="queue-item ${activeClass}" onclick="playTrack(state.queue[${index}], ${index})">
        <div class="queue-item-index">${index + 1}</div>
        <div class="queue-item-meta">
          <div class="queue-item-title">${track.title}</div>
          <div class="queue-item-artist">${track.artist}</div>
        </div>
        <div class="queue-item-time">${track.duration}</div>
      </div>
    `;
  });
  DOM.queueList.innerHTML = listHTML;
}

// Scrubber seeker percentage calculator helper
function seekToPercentage(pct) {
  if (!player || !state.isPlayerReady) return;
  try {
    const duration = player.getDuration() || 0;
    if (duration > 0) {
      const targetSeconds = (pct / 100) * duration;
      player.seekTo(targetSeconds, true);
      
      // Update local timeline instantly to feel snappy
      updateProgressSliders(targetSeconds, duration);
    }
  } catch (err) {
    console.warn(err);
  }
}

function updateProgressSliders(current, duration) {
  if (duration <= 0) return;
  const percentage = Math.min(100, Math.max(0, (current / duration) * 100));

  // Desktop slider sync
  if (DOM.playerProgressFill) DOM.playerProgressFill.style.width = `${percentage}%`;
  if (DOM.playerProgressThumb) DOM.playerProgressThumb.style.left = `${percentage}%`;
  
  // Mobile fullscreen slider sync
  if (DOM.fullscreenProgressFill) DOM.fullscreenProgressFill.style.width = `${percentage}%`;
  if (DOM.fullscreenProgressThumb) DOM.fullscreenProgressThumb.style.left = `${percentage}%`;

  // Mobile mini-player flat bar sync
  if (DOM.miniProgressFill) DOM.miniProgressFill.style.width = `${percentage}%`;

  // Stage (Large Player Page) slider sync
  const stageFill = document.getElementById('stage-progress-fill');
  const stageThumb = document.getElementById('stage-progress-thumb');
  const stageTimeCurrent = document.getElementById('stage-time-current');
  const stageTimeDuration = document.getElementById('stage-time-duration');
  if (stageFill) stageFill.style.width = `${percentage}%`;
  if (stageThumb) stageThumb.style.left = `${percentage}%`;

  // Time labels
  const remaining = Math.max(0, duration - current);
  
  if (DOM.playerTimeCurrent) DOM.playerTimeCurrent.textContent = formatTime(current);
  if (DOM.playerTimeDuration) DOM.playerTimeDuration.textContent = `-${formatTime(remaining)}`;
  
  if (DOM.fullscreenTimeCurrent) DOM.fullscreenTimeCurrent.textContent = formatTime(current);
  if (DOM.fullscreenTimeDuration) DOM.fullscreenTimeDuration.textContent = `-${formatTime(remaining)}`;

  if (stageTimeCurrent) stageTimeCurrent.textContent = formatTime(current);
  if (stageTimeDuration) stageTimeDuration.textContent = `-${formatTime(remaining)}`;
}

// Format Seconds to MM:SS
function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Timeline loops updater
setInterval(() => {
  if (!player || !state.isPlayerReady || state.isDraggingSeekbar || !state.isPlaying) return;

  try {
    if (typeof player.getCurrentTime === 'function' && typeof player.getDuration === 'function') {
      const current = player.getCurrentTime() || 0;
      const duration = player.getDuration() || 0;

      if (duration > 0) {
        updateProgressSliders(current, duration);

        // Update buffering fraction bar
        if (typeof player.getVideoLoadedFraction === 'function') {
          const loadedPct = (player.getVideoLoadedFraction() || 0) * 100;
          if (DOM.playerProgressBuffer) DOM.playerProgressBuffer.style.width = `${loadedPct}%`;
          if (DOM.fullscreenProgressBuffer) DOM.fullscreenProgressBuffer.style.width = `${loadedPct}%`;
          const stageProgressBuffer = document.getElementById('stage-progress-buffer');
          if (stageProgressBuffer) stageProgressBuffer.style.width = `${loadedPct}%`;
        }
      }
    }
  } catch (err) {
    // Silent
  }
}, 250);

// Seeker interaction listeners setup
function bindScrubberEvents(container) {
  if (!container) return;

  function handleSeek(e) {
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clampedX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const percentage = (clampedX / rect.width) * 100;
    seekToPercentage(percentage);
  }

  container.addEventListener('mousedown', (e) => {
    state.isDraggingSeekbar = true;
    container.classList.add('is-dragging');
    handleSeek(e);
  });

  window.addEventListener('mousemove', (e) => {
    if (state.isDraggingSeekbar) handleSeek(e);
  });

  window.addEventListener('mouseup', () => {
    if (state.isDraggingSeekbar) {
      state.isDraggingSeekbar = false;
      container.classList.remove('is-dragging');
    }
  });

  container.addEventListener('touchstart', (e) => {
    state.isDraggingSeekbar = true;
    container.classList.add('is-dragging');
    handleSeek(e);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (state.isDraggingSeekbar) handleSeek(e);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (state.isDraggingSeekbar) {
      state.isDraggingSeekbar = false;
      container.classList.remove('is-dragging');
    }
  });
}

// Toast Notifications popup
function showToast(message) {
  if (!DOM.toastNotification || !DOM.toastMessage) return;
  DOM.toastMessage.textContent = message;
  DOM.toastNotification.classList.remove('hidden');
  setTimeout(() => {
    DOM.toastNotification.classList.add('hidden');
  }, 2500);
}

function hideAutoplayPrompt() {
  if (DOM.autoplayOverlay) {
    DOM.autoplayOverlay.classList.add('hidden');
  }
}

// ==========================================================================
// 7. YOUTUBE IFRAME INTEGRATION ENGINE
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
    console.warn('YT Player load retry:', e);
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
  state.isPlayerReady = true;
  
  // Set default initial volume
  setVolume(100);

  // If there was a pending track click before API was ready, load it
  if (state.pendingPlay || state.userHasInteracted) {
    playTrack(state.currentTrack || TRACKS_DB[0], state.queueIndex);
  }
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    state.isPlaying = true;
    hideAutoplayPrompt();
    syncPlaybackUI();
  } else if (event.data === YT.PlayerState.PAUSED) {
    state.isPlaying = false;
    syncPlaybackUI();
  } else if (event.data === YT.PlayerState.ENDED) {
    playNextTrack();
  }
}

function onPlayerError(event) {
  console.warn('YouTube restricted track, auto skipping code:', event.data);
  playNextTrack();
}

// ==========================================================================
// 8. BIND EVENT LISTENERS & INITIATE PLATFORM
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial State Load
  state.currentTrack = TRACKS_DB[0];
  state.queue = [...TRACKS_DB];
  state.queueIndex = 0;
  
  navigateToTab('home');
  syncVolumeUI();
  renderQueueList();

  // 2. Setup Scrubber click events
  bindScrubberEvents(DOM.playerProgressContainer);
  bindScrubberEvents(DOM.fullscreenProgressContainer);

  // 3. Desktop Navigation Item Click events
  const setTabClick = (element, tabName) => {
    element.addEventListener('click', () => navigateToTab(tabName));
  };
  setTabClick(DOM.navHome, 'home');
  setTabClick(DOM.navSearch, 'search');
  setTabClick(DOM.navLibrary, 'library');
  
  setTabClick(DOM.mobTabHome, 'home');
  setTabClick(DOM.mobTabSearch, 'search');
  setTabClick(DOM.mobTabLibrary, 'library');

  // Sidebar sub section page routing links
  DOM.navSubPlaylists.addEventListener('click', () => navigateToSubPage('playlists', 'playlists'));
  DOM.navSubDecades.addEventListener('click', () => navigateToSubPage('decades', 'decades'));
  DOM.navSubArtists.addEventListener('click', () => navigateToSubPage('artists', 'artists'));
  DOM.navSubLiked.addEventListener('click', () => navigateToSubPage('liked', 'liked'));

  // 4. Back Arrow Navigation trigger
  DOM.navBackBtn.addEventListener('click', goBack);

  // 5. Search field controls
  DOM.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    if (state.searchQuery.trim() !== '') {
      DOM.searchClearBtn.classList.remove('hidden');
    } else {
      DOM.searchClearBtn.classList.add('hidden');
    }
    renderSearchView();
  });

  DOM.searchClearBtn.addEventListener('click', () => {
    DOM.searchInput.value = '';
    state.searchQuery = '';
    DOM.searchClearBtn.classList.add('hidden');
    renderSearchView();
    DOM.searchInput.focus();
  });

  // 6. Playback Control Button Toggles
  const bindPlayToggle = (btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });
  };
  bindPlayToggle(DOM.playerPlayPauseBtn);
  bindPlayToggle(DOM.miniPlayPauseBtn);
  bindPlayToggle(DOM.fullscreenPlayPauseBtn);

  const bindNextClick = (btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      playNextTrack();
    });
  };
  bindNextClick(DOM.playerNextBtn);
  bindNextClick(DOM.miniNextBtn);
  bindNextClick(DOM.fullscreenNextBtn);

  const bindPrevClick = (btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      playPrevTrack();
    });
  };
  bindPrevClick(DOM.playerPrevBtn);
  bindPrevClick(DOM.fullscreenPrevBtn);

  // Like buttons
  const bindLikeClick = (btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state.currentTrack) {
        toggleLikeTrack(state.currentTrack.id);
      }
    });
  };
  bindLikeClick(DOM.playerLikeBtn);
  bindLikeClick(DOM.fullscreenLikeBtn);

  // Volume slider handlers
  DOM.playerVolumeSlider.addEventListener('input', (e) => {
    setVolume(e.target.value);
  });
  DOM.fullscreenVolumeSlider.addEventListener('input', (e) => {
    setVolume(e.target.value);
  });

  // Mute buttons
  DOM.playerMuteBtn.addEventListener('click', toggleMute);
  DOM.fullscreenMuteBtn.addEventListener('click', toggleMute);

  // Shuffle & Repeat toggles
  DOM.playerShuffleBtn.addEventListener('click', () => {
    isShuffleActive = !isShuffleActive;
    DOM.playerShuffleBtn.classList.toggle('active', isShuffleActive);
    DOM.fullscreenShuffleBtn.classList.toggle('active', isShuffleActive);
    showToast(isShuffleActive ? 'Shuffle Enabled' : 'Shuffle Disabled');
  });
  
  DOM.fullscreenShuffleBtn.addEventListener('click', () => {
    isShuffleActive = !isShuffleActive;
    DOM.playerShuffleBtn.classList.toggle('active', isShuffleActive);
    DOM.fullscreenShuffleBtn.classList.toggle('active', isShuffleActive);
    showToast(isShuffleActive ? 'Shuffle Enabled' : 'Shuffle Disabled');
  });

  DOM.playerRepeatBtn.addEventListener('click', () => {
    isRepeatActive = !isRepeatActive;
    DOM.playerRepeatBtn.classList.toggle('active', isRepeatActive);
    DOM.fullscreenRepeatBtn.classList.toggle('active', isRepeatActive);
    showToast(isRepeatActive ? 'Repeat Enabled' : 'Repeat Disabled');
  });

  DOM.fullscreenRepeatBtn.addEventListener('click', () => {
    isRepeatActive = !isRepeatActive;
    DOM.playerRepeatBtn.classList.toggle('active', isRepeatActive);
    DOM.fullscreenRepeatBtn.classList.toggle('active', isRepeatActive);
    showToast(isRepeatActive ? 'Repeat Enabled' : 'Repeat Disabled');
  });

  // Queue Panel toggles
  DOM.toggleQueueBtn.addEventListener('click', () => {
    state.isQueueOpen = !state.isQueueOpen;
    DOM.appContainer.classList.toggle('queue-closed', !state.isQueueOpen);
    DOM.toggleQueueBtn.classList.toggle('active', state.isQueueOpen);
  });

  DOM.clearQueueBtn.addEventListener('click', clearQueue);

  // 7. Mobile Modal Fullscreen Player toggles
  // Tapping anywhere on the mobile mini-player opens fullscreen view
  DOM.miniPlayerExpandBtn.addEventListener('click', () => {
    DOM.mobileFullscreenPlayer.classList.remove('hidden');
  });

  DOM.closeFullscreenBtn.addEventListener('click', () => {
    DOM.mobileFullscreenPlayer.classList.add('hidden');
  });

  // Fullscreen Queue toggle (shows queue list in mobile view)
  DOM.fullscreenQueueBtn.addEventListener('click', () => {
    DOM.mobileFullscreenPlayer.classList.add('hidden');
    navigateToTab('library'); // Go to library which features tracks/playlists
    showToast('Switched to Library');
  });

  // Tapping bottom bar artwork opens full now-playing page on desktop
  DOM.playerArtTrigger.addEventListener('click', () => {
    // Navigate to dedicated song player view on desktop
    if (state.currentTrack) {
      navigateToSubPage('player', state.currentTrack.id);
    }
  });

  // Keyboard controls binding
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    switch (e.code) {
      case 'Space':
        e.preventDefault();
        togglePlay();
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

  // Unblock Audio on Gesture
  const unblockAudioContext = () => {
    state.userHasInteracted = true;
    hideAutoplayPrompt();
    if (state.isPlayerReady && player && typeof player.playVideo === 'function') {
      if (!state.isPlaying) {
        togglePlay();
      }
    }
  };

  document.addEventListener('touchstart', unblockAudioContext, { once: true, passive: true });
  document.addEventListener('click', unblockAudioContext, { once: true });

  // Initialize presence tracking simulation
  initPresence();
});

// ==========================================================================
// 9. MULTI-USER PRESENCE TRACKING
// ==========================================================================

function initPresence() {
  // Simulate active listeners
  const randomCount = Math.floor(Math.random() * 6) + 3;
  updateListenerCount(randomCount);
  
  // Periodically change number of listeners to feel active
  setInterval(() => {
    const diff = Math.random() > 0.5 ? 1 : -1;
    const current = parseInt(DOM.listenerCountText.textContent) || 5;
    updateListenerCount(Math.max(1, current + diff));
  }, 10000);
}

function updateListenerCount(count) {
  const text = `${count} Live`;
  DOM.listenerCountText.textContent = text;
}
