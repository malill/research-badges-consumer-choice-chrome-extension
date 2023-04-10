const { ProductNavigatorData } = require("./model/ProductNavigatorData");
const { platformCSS } = require("./style/platform");

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

// Check if user is in control group, if yes show platform styling
if (productNavigatorData.user.group == 'c') {
    // Default styling is "blank". Now we check 
    // whether we need to inject platform style.
    const injectCSS = css => {
        let el = document.createElement('style');
        el.type = 'text/css';
        el.innerText = css;
        document.head.appendChild(el);
        return el;
    };
    injectCSS(platformCSS);
}

try {
    // Check if there are search results present, if yes attach to datalayer
    const searchResults = document.querySelectorAll(`div[data-component-type="s-search-result"]`)
    productNavigatorData.attachEventsfromSearchResults(searchResults);
} catch (error) { }