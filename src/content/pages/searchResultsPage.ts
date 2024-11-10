
import { COOKIE_LIFETIME_1DAY, COOKIE_VALUE_TASK_ID_GROUP_01, COOKIE_VALUE_TASK_ID_GROUP_02, COOKIE_VALUE_TASK_ID_GROUP_03, CUSTOM_BADGE_MAX_POSITION } from "../../config/settings";
import { ProductNavigatorData } from "../model/ProductNavigatorData";
import { amazonsChoiceBadge } from "../style/customBadge";
import { modCSS_03, modCSS_04 } from "../style/modCSS";
import { checkCookie } from "../util/cookie";
import { injectCSS } from "../util/injectCSS";

// Create the datalayer object, responsible for analytics
let productNavigatorData = new ProductNavigatorData();

// Check if user is in control group, if yes inject modified CSS
if (productNavigatorData.user.user_task_id == COOKIE_VALUE_TASK_ID_GROUP_01) {
    // Default styling is "blank" > inject platform style
    injectCSS(modCSS_03);
} else if (productNavigatorData.user.user_task_id == COOKIE_VALUE_TASK_ID_GROUP_02 || productNavigatorData.user.user_task_id == COOKIE_VALUE_TASK_ID_GROUP_03) {
    // Default styling is "blank" > inject platform style
    injectCSS(modCSS_04);
}

try {
    // Check if there are search results present, if yes attach to datalayer
    const searchResults = document.querySelectorAll(`div[data-component-type="s-search-result"]`)

    if (productNavigatorData.user.user_task_id == COOKIE_VALUE_TASK_ID_GROUP_02) {
        // Attach platform badge to a random search result
        const customBadgePosition = checkCookie("custom-badge-position", Math.floor(Math.random() * searchResults.length), COOKIE_LIFETIME_1DAY);
        const randomSearchResult = searchResults[customBadgePosition];
        const randomSearchResultInner = randomSearchResult.querySelector(`div[class="puisg-col-inner"]`);
        randomSearchResultInner.insertAdjacentHTML('afterbegin', amazonsChoiceBadge);
    }

    productNavigatorData.eventHandlerSearchResults(searchResults);
} catch (error) { }