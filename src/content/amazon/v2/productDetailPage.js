import { PRL_MISSING_VALUE } from "../../../config/constants";
import { AmazonPDPItem } from "./model/AmazonPDPItem";
import { ProductNavigatorData } from "./model/ProductNavigatorData";
import { Event } from "./model/Event";

// Create the datalayer object, responsible for tracking
let productNavigatorData = new ProductNavigatorData();

// Emit the "inspect" event
let addToCartDivElement = document.getElementById("addToCart_feature_div");
const asin = addToCartDivElement.getAttribute("data-csa-c-asin");
let item = new AmazonPDPItem(asin);
let event = new Event(item, "inspect");
productNavigatorData.pushEvent(event);

if (productNavigatorData.user.id != PRL_MISSING_VALUE) {
    // User came from Prolific (control or treatment), customize add-to-cart function
    try {
        // Remove the add to cart input button (note: its parent div is already disabled by blank.css, but will be activated again below)
        const addToCartInputElement = document.getElementById('add-to-cart-button');
        addToCartInputElement.remove();

        addToCartDivElement.addEventListener("click", () => {
            alert("Thank you for participating in our survey. Please hit the blue 'Ok' button and you will be redicted to the questionaire to answer a few more final questions.");
            // Simulate an HTTP redirect:
            window.location.href = "http://www.w3schools.com";
        });
    } catch (error) { }
}

// Make the add-to-cart div element clickable again
addToCartDivElement.style['pointer-events'] = "auto";
