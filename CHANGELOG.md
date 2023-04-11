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