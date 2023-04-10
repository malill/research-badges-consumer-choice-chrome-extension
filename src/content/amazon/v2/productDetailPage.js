import { ProductNavigatorData } from "./model/ProductNavigatorData";

try {
    // Disable the add to cart button and show dialog
    document.getElementById("addToCart_feature_div").addEventListener("click", () => {
        alert("Thank you for participating in our survey. You are redirect to the questionaire to answer a few more questions.");
        // Simulate an HTTP redirect:
        window.location.href = "http://www.w3schools.com";
    });
} catch (error) { }

// Create the datalayer object, responsible for tracking
let productNavigatorData = new ProductNavigatorData();