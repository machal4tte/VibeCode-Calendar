# Electron Calendar

Responsive desktop calendar for Windows, macOS, and Linux, built with Electron.

## Features
- Day, Month, and Year views; layout adapts to the window size.
- Create, edit, and delete events saved in local application data.
- Import and export `.ics` files, the portable calendar format supported by many calendar apps.
- Windows installer creates Start Menu and desktop shortcuts and includes an uninstaller.
- macOS DMG packaging and Linux AppImage/DEB packaging.

## Requirements
Install Node.js 20+ and npm.

## Run from GitHub/source
```bash
git clone https://github.com/YOUR-USERNAME/electron-calendar.git
cd electron-calendar
npm install
npm start
```

## Build installers
Build on each target OS for best compatibility:
```bash
npm run dist:win    # Windows NSIS .exe installer
npm run dist:mac    # macOS .dmg
npm run dist:linux  # Linux AppImage and .deb
```
Build artifacts are written to `release/`.

## Install
- **Windows:** run the generated installer `.exe`; choose an install folder. It creates desktop and Start Menu shortcuts.
- **macOS:** open the `.dmg` and drag Electron Calendar to Applications. Distribution to other users may require signing/notarization.
- **Linux AppImage:** run `chmod +x release/*.AppImage` and launch the AppImage.
- **Linux DEB:** install the generated package with `sudo apt install ./release/*.deb`.

## Uninstall
- **Windows:** Settings → Apps → Installed apps → Electron Calendar → Uninstall (or use the bundled uninstaller).
- **macOS:** quit the app and move it from Applications to Trash.
- **Linux AppImage:** quit the app and delete the AppImage and any shortcuts you created.
- **Linux DEB:** remove the installed package with `sudo apt remove electron-calendar` (verify the actual package name with `dpkg -l | grep -i electron`).

Uninstalling does not automatically delete user event data. Export a backup first. App data is stored in Electron's per-user data folder (Windows `%APPDATA%`, macOS `~/Library/Application Support`, Linux `~/.config`).

## Use the app
- Click **＋ New event**, enter a title, start/end time, optional notes, and save.
- Click a date number in Month or Year view to open Day view.
- Click an event to edit it; use Delete in the editor to remove it.
- Use **Import .ics** to import an `.ics` calendar exported from Apple Calendar, Outlook, GNOME Calendar, Thunderbird, or another compatible app.
- Use **Export .ics** to write local events to a file, then import that file in another calendar app.

## Google Calendar and system calendars
This starter release does **not yet include Google Calendar OAuth/API integration** or live system calendar synchronization. These require credentials, consent/permission flows, and platform-specific integration. `.ics` import/export is the portable cross-platform exchange method. For live integration, add Google Calendar API OAuth, macOS EventKit, Microsoft Graph/Outlook APIs on Windows, and the appropriate desktop calendar service on Linux.

## GNOME launcher icon
The Linux package metadata is configured through electron-builder. For an AppImage, GNOME integration can vary by distribution. Prefer the DEB package for normal launcher integration, or create a `.desktop` launcher pointing to the AppImage with an absolute icon path.

## Publish to GitHub
```bash
git init
git add .
git commit -m "Initial Electron calendar"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/electron-calendar.git
git push -u origin main
```
Create GitHub Releases and upload the generated files from `release/`.

## Known limitations
- Google Calendar live sync and OS-native calendar live sync are not included yet; `.ics` is file-based exchange, not two-way sync.
- `.ics` parser supports common event fields, not every recurrence/time-zone edge case.
- Year view is a compact 12-month overview.
