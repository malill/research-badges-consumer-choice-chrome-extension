import { PRL_MISSING_VALUE } from "../../../config/constants";
import { AmazonPDPItem } from "./model/AmazonPDPItem";
import { ProductNavigatorData } from "./model/ProductNavigatorData";
import { Event } from "./model/Event";

// Create the datalayer object, responsible for tracking
let productNavigatorData = new ProductNavigatorData();

// Emit the "inspect" event
const asin = document.getElementById('addToCart_feature_div').getAttribute("data-csa-c-asin");
let item = new AmazonPDPItem(asin);
let event = new Event(item, "inspect");
productNavigatorData.pushEvent(event);

try {
    if (productNavigatorData.user.id != PRL_MISSING_VALUE) {
        // Disable the add to cart button, make the add to cart button unresponsive
        const addToCartEl = document.getElementById('add-to-cart-button');
        addToCartEl.remove();

        document.getElementById("addToCart_feature_div").addEventListener("click", () => {
            alert("Thank you for participating in our survey. You can close this tab now and return to the questionaire to answer a few more final questions.");
            // Simulate an HTTP redirect:
            // window.location.href = "http://www.w3schools.com";
        });
    }
} catch (error) { }
