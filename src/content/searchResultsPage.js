const { COOKIE_VALUE_TASK_ID_CONTROL } = require("../config/constants");
const { ProductNavigatorData } = require("./model/ProductNavigatorData");
const { platformCSS } = require("./style/platform");

// Create the datalayer object, responsible for tracking
let productNavigatorData = new ProductNavigatorData();

// Check if user is in control group, if yes show platform styling
if (productNavigatorData.user.taskID == COOKIE_VALUE_TASK_ID_CONTROL) {
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