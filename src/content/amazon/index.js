// This script gets loaded on amazon.de & amazon.co.uk (--> see manifest.json)

import { AMA_LOCATION_DICT, AMA_EVENT_TYPES_DICT, REST_API_EVENTS_URL } from "../../config/constants"
import { cl } from "../util";
import { User } from "./model/User";
import { Platform } from "./model/Platform";
import { attach_search_event_data_to_datalayer } from "./page/search_page";

var $ = require("jquery"); // only use for $.ajax(...)
const URL = window.location.href
let ecmDataLayer = {}
ecmDataLayer.events = []


chrome.storage.local.get(["userId", "userGroup", "environment"]).then((userInfo) => {
    getAmazonInfo(userInfo)
    // TODO: behavior when no user info present?
});

// TODO: Do the datalayer stuff, i.e. create an ECM datalayer

async function getAmazonInfo(userInfo) {

    // Create User instance & attach to datalayer
    let user = new User(userInfo)
    await user.getBattery()
    ecmDataLayer.user = user

    // Create platform instance & attach to datalayer
    let platform = new Platform()
    ecmDataLayer.platform = platform


    if (URL.includes("/s?k")) {
        // Search page
        // TODO: check if this is really a good condition

        const searchResults = document.querySelectorAll(`div[data-component-type="s-search-result"]`)
        attach_search_event_data_to_datalayer(ecmDataLayer, userInfo.userGroup, searchResults)

        console.log(ecmDataLayer)

        $.ajax({
            url: REST_API_EVENTS_URL,
            headers: {
            },
            type: "POST",
            data: JSON.stringify(ecmDataLayer),
            contentType: "application/json",
            dataType: "json"
        });

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

        let ecmEventData = {}
        ecmEventData["item_id"] = asin
        ecmEventData["item_name_len"] = itemNameLen
        ecmEventData["price"] = itemPrice
        ecmEventData["avg_rating"] = ratingInt
        ecmEventData["n_reviews"] = nReviewInt
        ecmEventData["event_type"] = AMA_EVENT_TYPES_DICT["INSPECT"]
        ecmEventData["location"] = AMA_LOCATION_DICT["PDP"]

        $.ajax({
            url: REST_API_EVENTS_URL,
            headers: {
            },
            type: "POST",
            data: JSON.stringify({ event_create: ecmEventData }),
            contentType: "application/json",
            dataType: "json"
        });
    }


}
