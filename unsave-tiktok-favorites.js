/*
 * TikTok Unsave Favorites
 * -----------------------
 * Automatically un-saves (un-favourites) videos from your TikTok
 * "Favorites" list while you step through them in the video modal.
 *
 * Usage: open your TikTok Favorites, open the first video, then paste this
 * whole file into the browser DevTools console and press Enter.
 * Run stopUnfavoriting() in the console to stop early.
 *
 * See README.md for full instructions.
 */
(() => {
  if (window.__tiktokUnfavInterval) {
    clearInterval(window.__tiktokUnfavInterval);
  }

  const DELAY_MS = 1400; // Time between each video
  const MAX_RETRIES = 6;
  const processedVideos = new Set();

  let removedCount = 0;
  let retryCount = 0;

  // Finds the bookmark button whether data-e2e is on the <button> or inner <span>
  const findBookmarkButton = () => {
    const selectors = [
      '[data-e2e="browse-favorite-icon"]',
      '[data-e2e="undefined-icon"]',
      '[data-e2e="favorite-icon"]',
      'button[aria-label*="Favorite" i]',
      'button[aria-label*="Bookmark" i]'
    ];

    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el) {
        const btn = el.closest('button') || el;
        if (btn.offsetParent !== null) return btn;
      }
    }
    return null;
  };

  // Advances to the next video in the modal
  const goToNextVideo = () => {
    const nextBtn = document.querySelector(
      'button[data-e2e="arrow-right"], [data-e2e="arrow-right"]'
    );
    if (nextBtn && !nextBtn.disabled) {
      nextBtn.click();
      return true;
    }
    // Fallback: simulate pressing the Down Arrow key
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', keyCode: 40, bubbles: true })
    );
    return false;
  };

  console.log(
    '%c[TikTok Cleaner] Modal mode started! Run stopUnfavoriting() to stop.',
    'color: #00f2fe; font-weight: bold;'
  );

  window.__tiktokUnfavInterval = setInterval(() => {
    const currentVideoUrl = window.location.pathname;
    const favBtn = findBookmarkButton();

    // If we found the button and haven't clicked it for THIS video URL yet
    if (favBtn && !processedVideos.has(currentVideoUrl)) {
      retryCount = 0;
      processedVideos.add(currentVideoUrl);

      favBtn.click();
      removedCount++;
      console.log(`[TikTok Cleaner] Un-saved #${removedCount} (${currentVideoUrl})`);

      // Wait 450ms for the un-save request to fire, then move to the next video
      setTimeout(() => {
        goToNextVideo();
      }, 450);
      return;
    }

    // If current video is already processed, try moving to the next video
    retryCount++;
    console.log(`[TikTok Cleaner] Waiting/advancing to next video... (${retryCount}/${MAX_RETRIES})`);
    goToNextVideo();

    if (retryCount >= MAX_RETRIES) {
      console.log(
        `%c[TikTok Cleaner] Finished! No more videos to advance to. Total un-saved: ${removedCount}`,
        'color: #2ecc71; font-weight: bold;'
      );
      clearInterval(window.__tiktokUnfavInterval);
    }
  }, DELAY_MS);

  window.stopUnfavoriting = () => {
    clearInterval(window.__tiktokUnfavInterval);
    console.log(
      `%c[TikTok Cleaner] Stopped manually. Total un-saved: ${removedCount}`,
      'color: #ff4757; font-weight: bold;'
    );
  };
})();
