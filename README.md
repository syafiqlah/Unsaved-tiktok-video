# TikTok Unsave Favorites

A small browser script that automatically **un-saves (un-favourites) all the TikTok videos in your Favorites list**, one by one, so you don't have to click the bookmark button on each video manually.

It runs entirely in your browser's developer console. Nothing is installed, no password is entered, and no data is sent anywhere except TikTok's own website, which you are already using.

## Features

- Walks through your saved videos automatically in the video modal
- Clicks the bookmark/favorite button on each video and moves to the next one
- Counts how many videos were un-saved and prints progress in the console
- Stops automatically when there are no more videos, or manually with `stopUnfavoriting()`
- No installation or extension required

## Requirements

- A desktop browser: Google Chrome, Microsoft Edge, Brave, or Firefox
- A TikTok account, logged in on tiktok.com
- Your Favorites list open in the **video modal view** (see below)

## How to use

1. **Log in** to TikTok on the web at [tiktok.com](https://www.tiktok.com).
2. **Open your Favorites** from your profile page (the bookmark/saved tab).
3. **Click the first video** so it opens in the modal (the full-screen video player with the left/right arrows).
4. **Open the DevTools console:**
   - Windows / Linux: `Ctrl + Shift + J`
   - Mac: `Cmd + Option + J`
   - Or right-click the page, choose **Inspect**, then the **Console** tab.
5. **Allow pasting (Chrome/Edge only, first time):** type `allow pasting` in the console and press Enter. Chrome blocks pasted code otherwise.
6. **Copy the contents** of `unsave-tiktok-favorites.js` and paste it into the console, then press **Enter**.
7. Watch the console. You will see messages like `[TikTok Cleaner] Un-saved #1 ...`.
8. To **stop early**, type this in the console and press Enter:

   ```js
   stopUnfavoriting()
   ```

The script stops by itself when it reaches the end of your list.

## Settings

Near the top of the script you can change:

| Setting       | Default | Meaning                                                       |
|---------------|---------|---------------------------------------------------------------|
| `DELAY_MS`    | `1400`  | Milliseconds between checking each video. Increase if it skips videos. |
| `MAX_RETRIES` | `6`     | How many times it tries to move forward before giving up.     |

## Troubleshooting

- **Nothing happens:** Make sure a video is open in the modal, not just the grid of thumbnails.
- **It skips videos or stops too early:** Increase `DELAY_MS` (for example to `2000`) and run it again.
- **"Cannot paste" warning:** Do step 5 above.
- **Script was already running:** Running it again is safe. It clears the previous run first.
- **TikTok changed its layout:** TikTok updates its website often, so the button selectors may stop matching. Right-click the bookmark button, choose **Inspect**, and check its `data-e2e` attribute. Add that value to the `selectors` list in `findBookmarkButton`.

## Important notes

- **Use at your own risk.** This is an unofficial automation script. TikTok's Terms of Service restrict automated access, and TikTok may change its website at any time, which can break the script.
- **Only use it on your own account.** The script works on whatever account is logged in on your browser.
- **Un-saving is not deleting.** It only removes videos from your Favorites. The videos stay on TikTok.
- **Un-saving is hard to undo automatically.** If you un-save something by mistake, you need to favourite it again manually.
- This project is not affiliated with, endorsed by, or sponsored by TikTok or ByteDance.

## Files

| File                          | Description                               |
|-------------------------------|-------------------------------------------|
| `unsave-tiktok-favorites.js`  | The script to paste into the console      |
| `README.md`                   | This file                                 |
| `LICENSE`                     | MIT license                               |

## License

Released under the [MIT License](LICENSE). Free to use, modify, and share.
