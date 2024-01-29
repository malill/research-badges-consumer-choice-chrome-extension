# Documentation 📓

The Chrome Extension uses *Manifest V3*.

Official Google Documentation: https://developer.chrome.com/docs/extensions/mv3/

# Templates 

Check https://github.com/SimGus/chrome-extension-v3-starter for a Chrome Extension (V3) project setup

# Issues ❗
* In `public/manifest.json`: the CSS file `blank_search.css` is applied to all routes of Amazon UK http://www.amazon.co.uk/*. If only search page is selected, returning from a PDP to search results page via search box (+ hit enter) won't apply the CSS file. **The problem:** search and enter again **does not** reload the page again. OR DOES IT? SOMETIMES IT WORKS!? 🤔
