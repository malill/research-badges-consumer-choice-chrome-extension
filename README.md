# Wiki - ECM Bot Chrome Extension :computer:

*The repository for a Google Chrome Extension (=CE) to personalize web experience. The CE modifies existing web badges on online platforms and allows users to interact with the CE to modify its behavior.*

GDrive Folder: [GDrive | Dokumentation](https://drive.google.com/drive/folders/1pBqIvvLfcEXKi-nHX2-tu_SYiqeCzyYE?usp=share_link)

# Testing :microscope:

To locally test the current version of the Google CE in your Google Chrome Browser:

1. Download/Synchronize the latest distribution files ([GDrive | Software](https://drive.google.com/drive/u/0/folders/1hdiES6ifBHH_qJaHyJeREKVJokeppcb9))
2. Open [chrome://extensions/](chrome://extensions/) in your Google Chrome Browser
3. Enable developer mode "Entwicklermodus" (top right corner)
4. Select "Entpackte Erweiterung laden" (top left corner)
5. Choose the folder of the downloaded distribution files (from step 1.)
6. Enable the CE

![](.readme/Wiki%20-%20Local%20Testing.png)

> The above steps only need to be performed once. Whenever you synchronize the downloaded files with the current status you only need to hit **refresh** :arrows_counterclockwise: button on [chrome://extensions/](chrome://extensions/) page.

# Documentation :notebook:

The Chrome Extension uses *Manifest V3*.

Official Google Documentation: https://developer.chrome.com/docs/extensions/mv3/

## Concept

The basic concepts how the CE works are explained in this chapter.

### User Identification & Group Assignment

### Displaying Badges

The rules and behavior how badges are displayed are explained in this section.

> **The default styling for a user that has the CE installed is a "blank" styling, i.e. all platform specific badges are set to `display: none` and are therefore not displayed. This is needed since otherwise, flickering would happen and users could see the inital platform's styling (for a few miliseconds). The default styling is set in the `manifest.json` .**

The personalization steps can always be narrowed down to the following cases/decision. Given an item from a platform:

1. There is a platform badge attached to the item
   1. **Blank Style.** Hide the platform badge. This is the default behavior of the CE (see note above)
   2. **Platform Style.** Show (unhide) the platform badge. 
   3. **Custom Style.** Replace the plaform badge with a custom ECM badge. This means 
      1. Modify the platform badge (e.g. add classes, create styling, insert custom text/HTML tags etc. to existing HTML badge element) and show (unhide) the modified platform badge OR 
      2. Keep the platform badge hidden and create & insert a new HTML component for the ECM badge (would make case 2.2 easier, i.e. "reusability")
2. There is no platform badge attached to the item
   1. **Blank/Platform Style.** Do nothing. Neither a platform nor a custom badge will be shown.
   2. **Custom Style.** Show a ECM badge. Depending on the platform the respective HTML element might be missing at this point and needs to be inserted (what is not the case in 1.3.1 since there is already a hidden platform badge)

## Development 

> Check https://github.com/SimGus/chrome-extension-v3-starter for a Chrome Extension (V3) project setup
