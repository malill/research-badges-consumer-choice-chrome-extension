import { COOKIE_VALUE_TASK_ID_GROUP_01, COOKIE_VALUE_TASK_ID_GROUP_02 } from "../../config/settings";
import { ProductNavigatorData } from "../model/ProductNavigatorData";
import { Event } from "../model/Event";
import { COOKIE_NAME_TASK_ID, COOKIE_NAME_TASK_USER_ID } from "../../config/settings";
import { getCookie, setCookie } from "../util/cookie";
import { AmazonItem } from "../model/AmazonItem";
import { modCSS_PDP_03 } from "../style/modCSS";
import { injectCSS } from "../util/injectCSS";
import { amazonsChoiceBadgePDP } from "../style/customBadge";

// Instantiate a new ProductNavigatorData object
const productNavigatorData = new ProductNavigatorData();

// Check if user is in control group, if yes inject modified CSS
if (productNavigatorData.user.user_task_id == COOKIE_VALUE_TASK_ID_GROUP_01) {
    // Default styling is "blank" > inject platform style
    injectCSS(modCSS_PDP_03);
} else if (productNavigatorData.user.user_task_id == COOKIE_VALUE_TASK_ID_GROUP_02) {
    // Inject the custom badge (when it is the randomized assigned product)
    const cookie_custom_ac_asin = getCookie("custom-badge-asin");
    const current_asin = document.getElementById("addToCart_feature_div").getAttribute("data-csa-c-asin");
    if (cookie_custom_ac_asin == current_asin) {
        let customerReviewElement = document.querySelector(`div[id="averageCustomerReviews_feature_div"]`)
        customerReviewElement.insertAdjacentHTML('afterend', amazonsChoiceBadgePDP);
    }
}

// Remove elements if user is part of a study
removeElementIfUserInStudy('add-to-cart-button');
removeElementIfUserInStudy('buy-now-button');

// Assign event listeners
const addToCartHTMLIDs = ["addToCart_feature_div", "add-to-cart-button-ubb"];
const buyNowHTMLIDs = ["buyNow_feature_div"];
addListenersToButtons(addToCartHTMLIDs, "add-to-cart");
addListenersToButtons(buyNowHTMLIDs, "buy-now");

try {
    // Attach product details from HTML page to the data object
    productNavigatorData.eventHandlerProductDetailPage(document);
} catch (error) {
    console.info(`Error in eventHandlerProductDetailPage: ${error.message}`);
}

function removeElementIfUserInStudy(id: string): void {
    if (productNavigatorData.isUserFromStudy()) {
        try {
            const element = document.getElementById(id);
            element?.remove();
        } catch (error) {
            console.info(`Error removing element by id: ${error.message}`);
        }
    }
}

function addListenersToButtons(buttonIDs: string[], eventName: string): void {
    buttonIDs.forEach(id => {
        try {
            addEventListener(id, eventName);
        } catch (error) {
            console.info(`Error adding event listener to ${id}: ${error.message}`);
        }
    });
}

function addEventListener(id: string, eventName: string): void {
    const divElement = document.getElementById(id);

    divElement?.addEventListener("click", () => {
        const asin = divElement.getAttribute("data-csa-c-asin");
        let item = new AmazonItem(null, asin);
        item.name = document.getElementById("productTitle").textContent.trim();
        let event = new Event(item, eventName);
        productNavigatorData.pushEvent(event);

        // Check if user is part of a study and display alert message
        if (productNavigatorData.isUserFromStudy()) {
            try {
                alert(chrome.i18n.getMessage("taskEndedMessage"));
                // Delete all task info
                setCookie(COOKIE_NAME_TASK_USER_ID, "", -1);
                setCookie(COOKIE_NAME_TASK_ID, "", -1);
            } catch (error) {
                console.info(`Error when handling study user click: ${error.message}`);
            }
        }
    });

    // Enable pointer events for the div element
    divElement.style['pointer-events'] = "auto";
}
