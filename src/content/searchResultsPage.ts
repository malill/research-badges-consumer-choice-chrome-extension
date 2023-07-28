import { injectCSS } from "./util/injectCSS";

import { COOKIE_VALUE_TASK_ID_CONTROL } from "../config/settings";
import { ProductNavigatorData } from "./model/ProductNavigatorData";
import { modCSS_01 } from "./style/modCSS";

// Create the datalayer object, responsible for analytics
let productNavigatorData = new ProductNavigatorData();

// Check if user is in control group, if yes inject modified CSS
if (productNavigatorData.user.user_task_id == COOKIE_VALUE_TASK_ID_CONTROL) {
    // Default styling is "blank" > inject platform style
    injectCSS(modCSS_01);
}

try {
    // Check if there are search results present, if yes attach to datalayer
    const searchResults = document.querySelectorAll(`div[data-component-type="s-search-result"]`)
    productNavigatorData.attachEventsfromSearchResults(searchResults);
} catch (error) { }