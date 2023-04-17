import { ProductNavigatorData } from "./model/ProductNavigatorData";
import { Event } from "./model/Event";
import { COOKIE_VALUE_MISSING, COOKIE_NAME_TASK_ID, COOKIE_NAME_TASK_USER_ID } from "../config/settings";
import { setCookie } from "./util/cookie";
import { AmazonItem } from "./model/AmazonItem";

// Create the datalayer object, responsible for analytics
let productNavigatorData = new ProductNavigatorData();

// Get the parent div element of add-to-cart
let addToCartDivElement = document.getElementById("addToCart_feature_div");

// Emit the "inspect" event
const asin = addToCartDivElement.getAttribute("data-csa-c-asin");
let item = new AmazonItem(null, asin); // TODO: there needs to be a better way to get the ASIN
let inspectEvent = new Event(item, "inspect");
productNavigatorData.pushEvent(inspectEvent);

// When there is a taskID, the user came from a study (control or treatment)
if ((productNavigatorData.user.taskID) && (productNavigatorData.user.taskID != COOKIE_VALUE_MISSING)) {
    try {
        // Remove the add to cart input button (note: its parent div is already disabled by blank.css, but will be activated again below)
        const addToCartInputElement = document.getElementById('add-to-cart-button');
        addToCartInputElement.remove();

        addToCartDivElement.addEventListener("click", () => {
            let addToCartEvent = new Event(item, "add-to-cart");
            productNavigatorData.pushEvent(addToCartEvent);
            alert("Thank you for participating in our survey. Please hit the blue 'Ok' button and you will be redicted to the questionaire to answer a few more final questions.");

            // Delete all task info
            setCookie(COOKIE_NAME_TASK_USER_ID, "", -1);
            setCookie(COOKIE_NAME_TASK_ID, "", -1);

            // Simulate an HTTP redirect:
            // window.location.href = "http://www.w3schools.com";
        });
    } catch (error) { }
}

// Make the add-to-cart div element clickable again
addToCartDivElement.style['pointer-events'] = "auto";
