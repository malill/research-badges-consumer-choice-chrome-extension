
import { COOKIE_LIFETIME_1DAY, COOKIE_VALUE_TASK_ID_GROUP_01, COOKIE_VALUE_TASK_ID_GROUP_02, COOKIE_VALUE_TASK_ID_GROUP_03, CUSTOM_BADGE_MAX_POSITION } from "../../config/settings";
import { ProductNavigatorData } from "../model/ProductNavigatorData";
import { amazonsChoiceBadge, highestAvgRatingBadge, maxWeightedRatingBadge, mostRatingsBadge } from "../style/customBadge";
import { modCSS_03, modCSS_04 } from "../style/modCSS";
import { getCookie, setCookie } from "../util/cookie";
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
        let customBadgeASIN = getCookie("custom-badge-asin");
        if (customBadgeASIN == "") {
            // Get all unique ASINs from the search results
            let searchResultsASINs = [];
            searchResults.forEach(searchResult => {
                searchResultsASINs.push(searchResult.getAttribute('data-asin'));
            });
            searchResultsASINs = Array.from(new Set(searchResultsASINs));

            // Set cookie with the random ASIN
            customBadgeASIN = setCookie("custom-badge-asin", searchResultsASINs[Math.floor(Math.random() * searchResultsASINs.length)], COOKIE_LIFETIME_1DAY);
        }

        // Find all search results with the custom badge ASIN
        const customBadgeSearchResults = document.querySelectorAll(`div[data-asin="${customBadgeASIN}"]`);

        // Insert the custom badge to the search results
        customBadgeSearchResults.forEach(customBadgeSearchResult => {
            let customBadgeSearchResultInner = customBadgeSearchResult.querySelector(`div[class="puisg-col-inner"]`);
            // Surround with try-catch to avoid errors when badge is already present
            try {
                customBadgeSearchResultInner.insertAdjacentHTML('afterbegin', amazonsChoiceBadge);
            } catch (error) { }
        });
    }

    // Attach custom badges to search results
    let maxNRatings = 0;
    let maxNRatingsEl: Element | null = null;

    let maxAvgRating = 0;
    let highestAvgRatingEl: Element | null = null;

    let maxWeightedRating = 0;
    let maxWeightedRatingEl: Element | null = null;

    searchResults.forEach((searchResult) => {
        // Find and process number of ratings
        const nRatingsEl = searchResult.querySelector(`span.a-size-base.s-underline-text`);
        const nRatings = nRatingsEl ? parseInt(nRatingsEl.textContent.replace(",", ""), 10) : 0;
        if (nRatings > maxNRatings) {
            maxNRatings = nRatings;
            maxNRatingsEl = searchResult;
        }

        // Find and process average rating
        const avgRatingEl = searchResult.querySelector(`span.a-icon-alt`);
        const avgRating = avgRatingEl ? parseFloat(avgRatingEl.textContent.split(" ")[0]) : 0;
        if (avgRating > maxAvgRating) {
            maxAvgRating = avgRating;
            highestAvgRatingEl = searchResult;
        }

        // Calculate weighted rating
        const weightedRating = nRatings * avgRating;
        if (weightedRating > maxWeightedRating) {
            maxWeightedRating = weightedRating;
            maxWeightedRatingEl = searchResult;
        }
    });

    // Attach badges to respective elements
    maxNRatingsEl?.querySelector(`div.puisg-col-inner`)?.insertAdjacentHTML('afterbegin', mostRatingsBadge);
    highestAvgRatingEl?.querySelector(`div.puisg-col-inner`)?.insertAdjacentHTML('afterbegin', highestAvgRatingBadge);
    maxWeightedRatingEl?.querySelector(`div.puisg-col-inner`)?.insertAdjacentHTML('afterbegin', maxWeightedRatingBadge);

    productNavigatorData.eventHandlerSearchResults(searchResults);
} catch (error) { }