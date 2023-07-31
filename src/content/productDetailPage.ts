import { ProductNavigatorData } from "./model/ProductNavigatorData";
import { Event } from "./model/Event";
import { COOKIE_VALUE_MISSING, COOKIE_NAME_TASK_ID, COOKIE_NAME_TASK_USER_ID } from "../config/settings";
import { setCookie } from "./util/cookie";
import { AmazonItem } from "./model/AmazonItem";

// Create the datalayer object, responsible for analytics
let productNavigatorData = new ProductNavigatorData();

// Remove the add-to-cart and buy-now button if the user came from a study (control or treatment)
remove_html_element_by_id('add-to-cart-button');
remove_html_element_by_id('buy-now-button');

// Add event listeners to the add-to-cart and buy-now div element
add_event_listener("addToCart_feature_div", "add-to-cart");
add_event_listener("buyNow_feature_div", "buy-now");

function remove_html_element_by_id(id: string) {
    if (productNavigatorData.isUserFromStudy()) {
        try {
            // We need to make sure this input button is removed, otherwise it will result in a real 
            // add-to-cart action (what we don't want for study users).
            const addToCartInputElement = document.getElementById(id);
            addToCartInputElement.remove();
        } catch (error) { }
    }
}

function add_event_listener(id: string, eventName: string) {
    // Get the parent div element of add-to-cart
    let divElement = document.getElementById(id);

    divElement.addEventListener("click", () => {
        const asin = divElement.getAttribute("data-csa-c-asin");
        let item = new AmazonItem(null, asin);
        let addToCartEvent = new Event(item, eventName);
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
    divElement.style['pointer-events'] = "auto";
}

try {
    // Check if there are PDP infos present, if yes attach to datalayer
    // const searchResults = document.querySelectorAll(`div[data-component-type="s-search-result"]`)
    // productNavigatorData.attachEventsfromSearchResults(searchResults);

    let pdpRes = {};

    // Amazon's Choice Badge
    try {
        let acBadgeCategory = document.querySelector("#acBadge_feature_div > div > span.ac-for-text > span > span.ac-keyword-link").textContent;
        pdpRes["acCategory"] = acBadgeCategory;
    } catch (error) { }


    // Buy Box Information
    let buyBoxSimpleSelector = (selectorName: string) => document.querySelectorAll(`#tabular-buybox > div.tabular-buybox-container > div.tabular-buybox-text[tabular-attribute-name='${selectorName}']`)[0];
    let buyBoxExpandableSelector = (selectorName: string) => document.querySelectorAll(`#tabular-buybox > div > div.a-expander-content.a-expander-partial-collapse-content > div.tabular-buybox-container > div.tabular-buybox-text[tabular-attribute-name='${selectorName}']`)[0];

    const selectorNames = ["Payment", "Dispatches from", "Sold by", "Returns"];

    selectorNames.forEach((sName) => {
        try {
            pdpRes[sName] = (buyBoxSimpleSelector(sName) ? buyBoxSimpleSelector(sName) : buyBoxExpandableSelector(sName));
            pdpRes[sName] = pdpRes[sName].textContent.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
        } catch (error) { }
    });

    // Stock Level
    try {
        pdpRes["stockLevel"] = document.querySelector("#availability").textContent.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    } catch (error) { }

    console.log(pdpRes);
} catch (error) { }
