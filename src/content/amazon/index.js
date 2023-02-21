// This script gets loaded on amazon.de & amazon.co.uk


import { AMA_LOCATION_DICT, AMA_EVENT_TYPES_DICT, REST_API_EVENTS_URL } from "../../config/constants"
import { cl } from "../util";
import { AmazonSearchItem } from "./AmazonSearchItem";
import { Badge1 } from "./badges/Badge1";
import { Badge6 } from "./badges/Badge6";

var $ = require("jquery"); // only use for $.ajax(...)
const URL = window.location.href


chrome.storage.local.get(["userId", "userGroup", "environment"]).then((userInfo) => {
    console.log(userInfo)
    getAmazonInfo(userInfo)
    // TODO: behavior when no user info present?
});

function getAmazonInfo(userInfo) {

    const ecmEventDataUserId = userInfo.userId
    const ecmEventDataGroup = userInfo.userGroup
    const ecmEventDataHostname = window.location.hostname
    const ecmEventDataTabTitle = document.title
    const ecmEventDataTimestamp = Date.now()


    let ecmEventData = {
        user_id: ecmEventDataUserId,
        hostname: ecmEventDataHostname,
        tab_title: ecmEventDataTabTitle,
        group: ecmEventDataGroup,
        logged_in: 0,
        timestamp: ecmEventDataTimestamp
    }

    // Item mock data
    let ecmItemData = {
        id: "mockID",
        hostname: ecmEventDataHostname,
        name: "mockName"
    }


    if (URL.includes("/s?k")) {
        // Search page
        // TODO: check if this is really a good condition

        ecmEventData["event_type"] = AMA_EVENT_TYPES_DICT["VIEW"]
        // TODO: distinguish grid and list layout -> I think best is to check the item component style class OR the div in which the search results are shown
        ecmEventData["location"] = AMA_LOCATION_DICT["SEARCH_GRID"]

        const searchResults = document.querySelectorAll(`div[data-component-type="s-search-result"]`)
        // const searchResults = document.querySelectorAll(`div.s-search-results`)


        searchResults.forEach((searchResultElement) => {

            let amazonSearchItem = new AmazonSearchItem()

            // Basic attributes
            // ID
            amazonSearchItem.asin = searchResultElement.getAttribute("data-asin")
            // POSITION
            amazonSearchItem.position = parseInt(searchResultElement.getAttribute("data-index"))

            // NAME
            try {
                const nameEl = searchResultElement.querySelector("h2")
                amazonSearchItem.name = nameEl.textContent.trim()
            } catch (error) {
                // cl("Item name could not be found")
            }

            // AVG RATING & NUMBER OF REVIEWS
            try {
                const ratingEl = searchResultElement.getElementsByClassName("a-section a-spacing-none a-spacing-top-micro")[0]
                amazonSearchItem.avgRating = parseFloat(ratingEl.getElementsByClassName("a-size-base")[0].textContent.replace(/[{()},.]/g, ''))
                amazonSearchItem.nReviews = parseFloat(ratingEl.getElementsByClassName("a-size-base s-underline-text")[0].textContent.replace(/[{()},.]/g, ''))
            } catch (error) {
                // cl("No rating element found")
            }

            // PRICE
            try {
                const priceEl = searchResultElement.querySelector("span.a-price > span.a-offscreen")
                const priceValue = parseFloat(priceEl.textContent.replace(/\D/g, ''))
                amazonSearchItem.price = priceValue
            } catch (error) {
                // cl("No price element found")
            }

            // BADGES
            // 1
            const badge1 = new Badge1(searchResultElement, amazonSearchItem, ecmEventDataGroup)
            // [amazonSearchItem.defaultBadge1, amazonSearchItem.ecmBadge1] = badge1.getBadgeTypes()
            // [amazonSearchItem.defaultBadge1, amazonSearchItem.ecmBadge1] = getBadge1Info(searchResultElement, amazonSearchItem, ecmEventDataGroup)
            badge1.getBadgeTypes()
            amazonSearchItem.badge1Platform = badge1.platformBadge
            amazonSearchItem.badge1Ecm = badge1.ecmBadge

            // 6
            const badge6 = new Badge6(searchResultElement, amazonSearchItem, ecmEventDataGroup)
            badge6.getBadgeTypes()
            amazonSearchItem.badge6Platform = badge6.platformBadge
            amazonSearchItem.badge6Ecm = badge6.ecmBadge


            console.log(amazonSearchItem)
        })

        return


        let amazonSearchItem = new AmazonSearchItem()
        // TODO: Iterate over elements in the viewport
        // This here is only for development, functions should be moved to files
        let testBadge = 1

        // BADGE TYPE 1
        // dev_page: https://www.amazon.co.uk/s?k=dart+board&crid=1IDRISXAYGU4M&sprefix=dart+board%2Caps%2C100&ref=nb_sb_noss_1
        // badges: None: B09BFPG9YY / Ama Choice: B08CXP8KK1 / Best Seller: B0018D69TE
        amazonSearchItem.asin = 'B0018D69TE'


        let el = document.querySelector(`[data-asin=${amazonSearchItem.asin}]`)

        switch (testBadge) {
            case 1:
                amazonSearchItem.badge1 = getBadge1Info(el)
        }
        console.log(amazonSearchItem)

        if (testBadge === 2 || testBadge === 3) {
            // HERE: For development use https://www.amazon.co.uk/s?k=dart+board&crid=1IDRISXAYGU4M&sprefix=dart+board%2Caps%2C100&ref=nb_sb_noss_1
            // None: B07MD92L57 / Save X%: B08L4QV6ZH / Limited Time Deal: B07YRGFQHY
            let el = document.querySelector('[data-asin=B08L4QV6ZH]') // el should come from iterator
            let badge2, badge3 = undefined

            let priceEl = el.querySelector("div.s-price-instructions-style")
            let dealEl = priceEl.querySelector("[data-a-badge-color='sx-lightning-deal-red']")

            if (dealEl) {
                let couponText = dealEl.textContent
                if (couponText.includes("%")) {
                    badge2 = 1
                } else {
                    badge3 = 1
                }
            }
            console.log("Badge2:", badge2)
            console.log("Badge3:", badge3)
        }

        if (testBadge === 4 || testBadge === 5) {
            // HERE: For development use https://www.amazon.co.uk/s?k=dart+board+set&sprefix=dart+%2Caps%2C98&ref=nb_sb_ss_ts-doa-p_2_5
            // None: B07XL9FS37  / Voucher %: B091KFR3BV / Voucher Total Amount: B0BQMJLVML
            let el = document.querySelector('[data-asin=B091KFR3BV]') // el should come from iterator
            let badge4, badge5 = undefined

            let couponEl = el.querySelector("span.a-size-base.s-highlighted-text-padding.aok-inline-block.s-coupon-highlight-color")
            let couponText = couponEl.textContent
            if (couponText.includes("%")) {
                badge4 = 1
            } else {
                badge5 = 1
            }
            console.log("Badge4:", badge4)
            console.log("Badge5:", badge5)
        }


    } else if (URL.includes("/ref=")) {
        // Product detail page
        // TODO: check if this is really a good condition
        // TODO: not all PDPs have the below HTML tags, check when not (e.g. apparel seems to be differnt)
        // TODO: all get attribute functions (code parts) should be inside a try and catch clause

        // Item ID | Event & Item data
        const i_dp = URL.indexOf("/dp/")
        let asin = URL.substring(i_dp + 4)
        asin = asin.substring(0, asin.indexOf("/"))

        // Item price | Event data
        let itemPrice = undefined
        try {
            itemPrice = parseInt(document.getElementById("twister-plus-price-data-price").getAttribute("value").replaceAll('.', ''))
        } catch (error) {
            cl("No price for item found")
        }

        // Avg. rating | Event data (TODO: THERE ARE PRODUCTS WITHOUT RATINGS AND THIS WILL FAIL)
        let ratingInt = undefined
        try {
            let ratingTitle = document.getElementById("acrPopover").getAttribute("title")
            let ratingStr = ratingTitle.slice(0, 3)
            ratingInt = parseInt(ratingStr.replaceAll(',', '').replaceAll('.', ''))
        } catch (error) {
            cl("No rating for item found")
        }

        // Count of reviews | Event data
        let nReviewInt = undefined
        try {
            let reviewText = document.getElementById("acrCustomerReviewText").textContent
            let nReviewsStr = reviewText.slice(0, reviewText.indexOf(" "))
            nReviewInt = parseInt(nReviewsStr.replaceAll('.', '').replaceAll(',', ''))
        } catch (error) {
            cl("No number of reviews for item found")
        }

        // Item name | Item data
        const itemName = document.getElementById("productTitle").textContent.trim() // faster, no jQuery

        // Item name len | Event data
        const itemNameLen = itemName.length

        ecmEventData["item_id"] = asin
        ecmEventData["item_name_len"] = itemNameLen
        ecmEventData["price"] = itemPrice
        ecmEventData["avg_rating"] = ratingInt
        ecmEventData["n_reviews"] = nReviewInt
        ecmEventData["event_type"] = AMA_EVENT_TYPES_DICT["INSPECT"]
        ecmEventData["location"] = AMA_LOCATION_DICT["PDP"]

        ecmItemData["id"] = asin
        ecmItemData["name"] = itemName
    }

    $.ajax({
        url: REST_API_EVENTS_URL,
        headers: {
        },
        type: "POST",
        data: JSON.stringify({ event_create: ecmEventData, item_create: ecmItemData }),
        contentType: "application/json",
        dataType: "json"
    });
}
