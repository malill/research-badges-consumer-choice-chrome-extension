![](docs\cws_global_screenshot_01.png)

# Wiki - Product Navigator Chrome Extension

![version](https://img.shields.io/badge/version-1.0.17-green)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)


> The repository for the **Product Naviator** Chrome Extension. The repository can be used for research purposes. The paper [Product Badges and Consumer Choice on Digital Platforms](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4935668) utilizes the extension to study the impact of badges on consumer choice on Amazon UK.

The Product Navigator extension removes highlights and badges from search pages on Amazon UK. Through the extension, users can reduce information overload and potential biases in their decision-making. Anonymized data are collected to improve the extension behavior and analyze the user activities.

## Development

The extension is developed using TypeScript and Webpack. TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Webpack is a module bundler that takes modules with dependencies and generates static assets representing those modules.

### Installation

* Clone the repository
* Run `npm install`
* Run `npm run watch`

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