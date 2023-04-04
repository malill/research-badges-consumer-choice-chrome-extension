const { ProductNavigatorData } = require("./model/ProductNavigatorData");
const { platformCSS } = require("./style/platform");
var $ = require("jquery"); // only use for $.ajax(...)

console.log("Product Navigator Amazon [v2]")


let productNavigatorData = new ProductNavigatorData();
console.log(productNavigatorData);

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

if (productNavigatorData.page.queryString.includes("?k=")) {
    // Search page
    // TODO: check if this is really a good condition

    const searchResults = document.querySelectorAll(`div[data-component-type="s-search-result"]`)

    productNavigatorData.attachEventsfromSearchResults(searchResults);

    console.log(productNavigatorData);

}