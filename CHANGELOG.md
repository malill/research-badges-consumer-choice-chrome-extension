# v1.0.15 | 24.07.2024
* Show infos in search results: _badge 7, badge 10/11, badge 12, badge 17, Delivery info & eligible, "Bought Y the last month"_

# v1.0.14 | 16.07.2024
* Fix tracking *Badge 2 & 3*, Amazon changed into "deal" badge - not limited time deal only, e.g. also "Prime Day Deal"

# v1.0.13 | 07.07.2024
* Added `span[data-a-badge-type="deal"]` for *Badge 2 & 3* lightning deal badge
* Do not display *Badge 10 & 11* (more buying choices) in control group, since this enables add to basket from search results
* Added `div[data-cy="certification-recipe"]` for *Badge 13* small business badge

# v1.0.12 | 05.05.2024
* Various bug fixes and badge updates

# v1.0.3 | 10.05.2023
* Hide recommendation carousel on search results page

# v1.0.2 | 09.05.2023
* Use `navigator.sendBeacon` to send list of events to analytics endpoint
* Add buy-now button to analytics

# v1.0.1 | 05.05.2023
* Badge 19, "100+ bought in past week"
* Remove hyperlink from badges
* Set badge 12 value to "0" if item was "Temporarily out of stock"

# v1.0.0 | 25.04.2023
* Send image URL to analytics endpoint
* Send "right-click" event when user right-clicks on search result item
* Create "page-visit" event

# v0.1.1 | 21.04.2023
* Remove geolocation attributes from `User` object
* Send "subscribe-and-save" badge info
* Send "energy efficiency class" badge info
* Add localization to extension

# v0.1.0 | 19.04.2023
* Add log level environmental variable
* Fix: add-to-cart event was not fired when taskID not present
* Send "lowest-price-in-30-days" badge info

# v0.0.4 | 18.04.2023
* Create a study (="task") object that is sent to endpoint
* Send click event on search result items and add-to-cart event on PDP
* Show alert dialog when user hits add-to-cart button on PDP
* Create an "inspect" event when user visits PDP
* Create a random user ID for the application
* Additionally, store a task ID and a task user ID to link to respective surveys
* If present: delete task ID and task user ID when user hits add-to-cart button
* Create a `TaskEvent` object that can be send to analytics endpoint
* Convert to `TypeScript`
* Create different versions for development, testing and production
* Read analytics endpoint from environmental variable
* Send "out-of-stock" badge info
* Create service worker: respond extension version when requested externally
* Build `manifest.json` from single core file

# v0.0.3 | 09.04.2023
* Attach bages to `AmazonSearchItem` object
* Add URL to `Page` object
* Attach click listener to search results
* Open dialog when add-to-cart is pressed
* Emit an "inspect" event when user navigates to product detail page
* Emit an "add-to-cart" event when user hits Add To Basket on PDP

# v0.0.2 | 09.04.2023
* Create a JS datalayer object `ProductNavigatorData`
* Refactor project setup to `v2`
* Attach view listeners to search results
* Retrieve Prolific ID & Group from query parameters and cookie

# v0.0.1 | 06.02.2023
* Initial project setup
* Add styling that removes all Amazon digital nudges on extension installation 
* Remove Amazon nudges on search and product detail pages
* Send user requested URL in ECM Bot API request into header `ecm-bot-req-url`
* PDP, get price from HTML hidden input field
* PDP, get avg. rating from HTML popover 
* PDP, get count of reviews from HTML review text
* Search Page, remove UVP and delivery options
* Search Page, remove ad card on top of search results
* send event and item data together
* Search Page, remove other carousels (partner companies, ads, best seller etc.)
* FIX: remove tab title and URL from header request, since leads to error "Failed to execute 'setRequestHeader' on 'XMLHttpRequest': String contains non ISO-8859-1 code point."
* Catch errors when retrieving information from PDP
* Track average Rating, number of reviews, ASIN and BadgeType 1 on search pages