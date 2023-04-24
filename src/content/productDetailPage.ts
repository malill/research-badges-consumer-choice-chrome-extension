import { ProductNavigatorData } from "./model/ProductNavigatorData";
import { Event } from "./model/Event";
import { COOKIE_VALUE_MISSING, COOKIE_NAME_TASK_ID, COOKIE_NAME_TASK_USER_ID } from "../config/settings";
import { setCookie } from "./util/cookie";
import { AmazonItem } from "./model/AmazonItem";

// Create the datalayer object, responsible for analytics
let productNavigatorData = new ProductNavigatorData();

// Remove the add-to-cart button if the user came from a study (control or treatment)
if (productNavigatorData.isUserFromStudy()) {
    try {
        // We need to make sure this input button is removed, otherwise it will result in a real 
        // add-to-cart action (what we don't want for study users).
        const addToCartInputElement = document.getElementById('add-to-cart-button');
        addToCartInputElement.remove();
    } catch (error) { }
}

// Get the parent div element of add-to-cart
let addToCartDivElement = document.getElementById("addToCart_feature_div");

// Add an event listener to the add-to-cart div element
addToCartDivElement.addEventListener("click", () => {
    const asin = addToCartDivElement.getAttribute("data-csa-c-asin");
    let item = new AmazonItem(null, asin);
    let addToCartEvent = new Event(item, "add-to-cart");
    productNavigatorData.pushEvent(addToCartEvent);

    // When there is a taskID, the user came from a study (control or treatment)
    if (productNavigatorData.isUserFromStudy()) {
        try {
            alert(chrome.i18n.getMessage("taskEndedMessage"));
            // Delete all task info
            setCookie(COOKIE_NAME_TASK_USER_ID, "", -1);
            setCookie(COOKIE_NAME_TASK_ID, "", -1);
        } catch (error) { }
    }
});


// Make the add-to-cart div element clickable again (disbaled by blank.css)
addToCartDivElement.style['pointer-events'] = "auto";
