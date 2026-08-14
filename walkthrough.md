# Walkthrough - Rock Radio Single-Page Web Application

We have built a single-page, minimalist internet radio application for rock & metal music culture. The application features an off-screen YouTube IFrame audio streaming engine, glassmorphic UI controls, dynamic audio visualizers, and Supabase Realtime presence for tracking live room listeners.

![Rock Radio Background](file:///c:/Users/Sijan%20Thapa/OneDrive/Desktop/streaming%20platform/assets/background.jpg)

## Key Features Implemented

### 1. Minimalist Dark Aesthetic & Layout
- **Dynamic Viewports**: Uses `100dvh` and `100dvw` lock with hidden scrollbars (`overflow: hidden`) to prevent layout clipping on mobile browsers with dynamic address bars.
- **Vignette & Blur**: Backdrop blur (`backdrop-filter: blur(10px)`) combined with radial vignette gradients overlaying the dark cinematic concert background.
- **Zero White-Flash Load**: Preloaded background image via `<link rel="preload" as="image" href="assets/background.jpg">` and CSS body fallback `background-color: #0a0a0a;`.
- **Typography**: Off-white typography using Google Fonts *Space Grotesk* and *Inter*.

### 2. Off-Screen Audio Engine (YouTube IFrame API)
- Hidden YouTube player container (`.offscreen-player`) positioned off-screen to comply with browser DOM requirements while keeping audio playing.
- Curated classic rock, metal & grunge playlist (`PLx0sYbCqOb8TBPRjJTR9I5DR2Si83Cifc`).
- Automatic shuffle (`setShuffle(true)`), loop, and title parsing (removing YouTube suffixes like `(Official Video)` / `[HD]`).
- Autoplay attempt with seamless click-anywhere fallback prompt if browser policy blocks un-prompted audio.
- Error handling (`onPlayerError`) to automatically skip broken or embedding-restricted videos (`onError` -> `nextVideo()`).

### 3. Glassmorphic User Controls
- Exactly two minimalist buttons: **PLAY / PAUSE** toggle and **NEXT TRACK**.
- Built with glassmorphism CSS (`background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.14);`).
- Smooth hover opacity shifts and scale transitions.
- CSS animated equalizer visualizer bars that bounce when audio is playing.

### 4. Supabase Realtime Listener Presence
- Integrated `@supabase/supabase-js` v2 CDN.
- Anonymous join to public `'radio-room'` channel with presence state tracking.
- Real-time integer listener count display in bottom-right corner ("14 listeners tuning in").
- Graceful fallback mode if Supabase keys are left as placeholders, ensuring local music playback and UI counter function seamlessly.

---

## Created Files

- [index.html](file:///c:/Users/Sijan%20Thapa/OneDrive/Desktop/streaming%20platform/index.html) - HTML5 structure, CDN links, audio player container, UI controls, listener counter.
- [style.css](file:///c:/Users/Sijan%20Thapa/OneDrive/Desktop/streaming%20platform/style.css) - Design system, 100dvh/100dvw lock, glassmorphism, equalizer animation keyframes, dark vignette.
- [app.js](file:///c:/Users/Sijan%20Thapa/OneDrive/Desktop/streaming%20platform/app.js) - YouTube IFrame API engine, title parser, error handler, play/pause & next track logic, Supabase Realtime presence & fallback mode.
- [background.jpg](file:///c:/Users/Sijan%20Thapa/OneDrive/Desktop/streaming%20platform/assets/background.jpg) - Dark cinematic rock concert background asset.

---

## Verification & Testing

- **Local Server**: Running at `http://localhost:8080`.
- **Browser Testing**: Open `index.html` directly or navigate to `http://localhost:8080` in your web browser.
- **Controls Test**: Click **PLAY** / **PAUSE** and **NEXT TRACK** to verify YouTube audio engine responses and visualizer state updates.
