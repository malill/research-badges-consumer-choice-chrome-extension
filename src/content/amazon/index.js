// This script gets loaded on amazon.de & amazon.co.uk


import { AMA_LOCATION_DICT, AMA_EVENT_TYPES_DICT, REST_API_EVENTS_URL } from "../../config/constants"
import { cl } from "../util";
import { getBadge1Info } from "./badges/badge1";
import { get_product_details } from "./pages/search_page"

var $ = require("jquery"); // only use for $.ajax(...)
const URL = window.location.href

const ecmEventDataUserId = 1
const ecmEventDataHostname = window.location.hostname
const ecmEventDataTabTitle = document.title
const ecmEventDataGroup = 1
const ecmEventDataTimestamp = Date.now()

let ecmEventData = {
    user_id: ecmEventDataUserId,
    hostname: ecmEventDataHostname,
    tab_title: ecmEventDataTabTitle,
    group: ecmEventDataGroup,
    logged_in: 0,
    timestamp: ecmEventDataTimestamp
}

// Item Mock
let ecmItemData = {
    id: "mockID",
    hostname: ecmEventDataHostname,
    name: "mockName"
}

if (URL.includes("/s?k")) {
    // Search page
    // TODO: check if this is really a good condition

    ecmEventData["event_type"] = AMA_EVENT_TYPES_DICT["VIEW"]
    // TODO: distinguish grid and list layout -> I think best is to check the item component style class
    ecmEventData["location"] = AMA_LOCATION_DICT["SEARCH_GRID"]



    // TODO: Iterate over elements in the viewport
    // This here is only for development, functions should be moved to files
    let testBadge = 0

    if (testBadge === 1) {
        // HERE: For development use https://www.amazon.co.uk/s?k=dart+board&crid=1IDRISXAYGU4M&sprefix=dart+board%2Caps%2C100&ref=nb_sb_noss_1
        // None: B09BFPG9YY / Ama Choice: B08CXP8KK1 / Best Seller: B0018D69TE
        let el = document.querySelectorAll('[data-asin=B0018D69TE]')[0] // should come from iterator
        let badge1 = undefined

        const badgeEl = el.querySelector("span.rush-component [data-component-type='s-status-badge-component']")
        if (badgeEl) {
            const badgeCompProps = badgeEl.getAttribute("data-component-props")
            const jsonProps = JSON.parse(badgeCompProps)
            if (jsonProps["asin"] === "B0018D69TE") {
                badge1 = jsonProps["badgeType"]
            } else {
                console.log("Something went wrong. Badge type and corresponding ASIN do not match")
            }
        }
        console.log("Badge1:", badge1)
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