![](.readme/img/Screenshot_03_control_treatment_MOD.png)

# Wiki - Product Navigator Chrome Extension

*The repository for the **Product Naviator** Chrome Extension. The extension removes digital nudges from search pages on Amazon UK.*

See confluence for documentation.

# Build and Deployment

## Staging (BETA)

The staging version of the extension is available on the Chrome Web Store. It is available to all invited test users via the [Product Navigator BETA](https://chrome.google.com/webstore/detail/product-navigator-beta/ehlpeflmojonkaodoobdbiojlklomhnl) link.
Follow the steps for deployment to staging:

* Increase the version number in `manifest.json`
* Remove all files in the `dist` folder
* Run `npm run build-q`
* Zip the contents of the `dist` folder
* Rename the zip file to `dist_beta_v1.x.y`
* Upload the zip file to the Chrome Web Store

## Production

Analogous to the staging version, the production version of the extension is available on the Chrome Web Store. It is available to *all users* via the [Product Navigator](https://chrome.google.com/webstore/detail/product-navigator/cdbacljhnhbddiaabhfcihjdiiigkgfe) link.

* Remove all files in the `dist` folder
* Run `npm run build-p`
* Zip the contents of the `dist` folder
* Rename the zip file to `dist_v1.x.y`
* Upload the zip file to the Chrome Web Store