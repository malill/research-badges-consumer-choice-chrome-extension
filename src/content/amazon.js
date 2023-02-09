import { LOCATION_AMA_DICT, TYPES_AMA_DICT, AMA_CSS_BAGE_CLASS, REST_API_EVENTS_URL } from "../config/constants"
import { cl } from "./util";

var $ = require("jquery"); // only use for $.ajax(...)
const URL = window.location.href

const ecmDataUserId = 1
const ecmDataHostname = window.location.hostname
const ecmDataTabTitle = document.title
const ecmDataGroup = 1
const ecmDataTimestamp = Date.now()

let ecmData = {
    user_id: ecmDataUserId,
    hostname: ecmDataHostname,
    tab_title: ecmDataTabTitle,
    group: ecmDataGroup,
    timestamp: ecmDataTimestamp
}

// Item Mock
let ecmItemData = {
    id: "mockID",
    hostname: ecmDataHostname,
    name: "mockName"
}

var badgeClasses = $(`.${AMA_CSS_BAGE_CLASS}`)
cl(`Removed badges from ${badgeClasses.length} products`)

if (URL.includes("/s?k")) {
    // Search page
    // TODO: check if this is really a good condition

    ecmData["event_type"] = TYPES_AMA_DICT["VISIT"]

    // TODO: distinguish grid and list layout -> I think best is to check the item component style class
    ecmData["location"] = LOCATION_AMA_DICT["SEARCH_GRID"]

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
        itemPrice = parseInt(document.getElementById("twister-plus-price-data-price").getAttribute("value"))
    } catch (error) {
        cl("No price for item found")
    }

    // Avg. rating | Event data (TODO: THERE ARE PRODUCTS WITHOUT RATINGS AND THIS WILL FAIL)
    let ratingInt = undefined
    try {
        let ratingTitle = document.getElementById("acrPopover").getAttribute("title")
        let ratingStr = ratingTitle.slice(0, 3)
        ratingInt = parseInt(ratingStr.replaceAll(',', ''))
    } catch (error) {
        cl("No rating for item found")
    }

    // Count of reviews | Event data
    let nReviewInt = undefined
    try {
        let reviewText = document.getElementById("acrCustomerReviewText").textContent
        let nReviewsStr = reviewText.slice(0, reviewText.indexOf(" "))
        nReviewInt = parseInt(nReviewsStr.replaceAll('.', ''))
    } catch (error) {
        cl("No number of reviews for item found")
    }

    // Item name | Item data
    const itemName = document.getElementById("productTitle").textContent.trim() // faster, no jQuery

    // Item name len | Event data
    const itemNameLen = itemName.length

    ecmData["item_id"] = asin
    ecmData["item_name_len"] = itemNameLen
    ecmData["price"] = itemPrice
    ecmData["avg_rating"] = ratingInt
    ecmData["n_reviews"] = nReviewInt
    ecmData["event_type"] = TYPES_AMA_DICT["INSPECT"]
    ecmData["location"] = LOCATION_AMA_DICT["PDP"]

    ecmItemData["id"] = asin
    ecmItemData["name"] = itemName
}

$.ajax({
    url: REST_API_EVENTS_URL,
    headers: {
    },
    type: "POST",
    data: JSON.stringify({ event_create: ecmData, item_create: ecmItemData }),
    contentType: "application/json",
    dataType: "json"
});