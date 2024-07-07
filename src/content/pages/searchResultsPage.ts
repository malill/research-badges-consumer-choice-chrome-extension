
import { COOKIE_VALUE_TASK_ID_CONTROL } from "../../config/settings";
import { ProductNavigatorData } from "../model/ProductNavigatorData";
import { modCSS_01, modCSS_02, modCSS_03 } from "../style/modCSS";
import { injectCSS } from "../util/injectCSS";

// Create the datalayer object, responsible for analytics
let productNavigatorData = new ProductNavigatorData();

// Check if user is in control group, if yes inject modified CSS
if (productNavigatorData.user.user_task_id == COOKIE_VALUE_TASK_ID_CONTROL) {
    // Default styling is "blank" > inject platform style
    injectCSS(modCSS_03);
}

try {
    // Check if there are search results present, if yes attach to datalayer
    const searchResults = document.querySelectorAll(`div[data-component-type="s-search-result"]`)

    // Attach "bestseller" badge to a random search result
    // const randomSearchResult = searchResults[Math.floor(Math.random() * searchResults.length)];
    // const randomSearchResultInner = randomSearchResult.querySelector(`div[class="puisg-col-inner"]`);
    // randomSearchResultInner.insertAdjacentHTML('afterbegin', bestsellerBadge);

    productNavigatorData.eventHandlerSearchResults(searchResults);
} catch (error) { }