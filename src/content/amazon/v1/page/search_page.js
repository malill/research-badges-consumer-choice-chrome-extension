import { AMA_EVENT_TYPES_DICT, AMA_LOCATION_DICT } from "../../../../config/constants";
import { Badge1 } from "../badges/Badge1";
import { Badge2 } from "../badges/Badge2";
import { Badge4 } from "../badges/Badge4";
import { Badge6 } from "../badges/Badge6";
import { Badge7 } from "../badges/Badge7";
import { Badge8 } from "../badges/Badge8";
import { AmazonSearchItem } from "../model/AmazonSearchItem";

export function attach_search_event_data_to_datalayer(ecmDataLayer, userGroup, searchResults) {
    /* PARAMETERS
    ecmDataLayer    - data object to store event data
    userGroup       - group user belongs to (e.g. control, treatment)
    searchResults   - HTML query result*/

    searchResults.forEach((searchResultElement) => {

        let ecmEventData = {}
        ecmEventData.timestamp = new Date().toJSON();

        if (!isInViewport(searchResultElement)) {
            // TODO: set a listener to scroll into view and make ajax call (only once!)
            return
        }
        ecmEventData.event_type = AMA_EVENT_TYPES_DICT["VIEW"]
        // TODO: distinguish grid and list layout -> I think best is to check the item component style class OR the div in which the search results are shown
        ecmEventData.location = AMA_LOCATION_DICT["SEARCH_GRID"]

        // Create AmazonSearchItem instance
        let amazonSearchItem = new AmazonSearchItem(searchResultElement)

        // BADGES
        // 1
        const badge1 = new Badge1(searchResultElement, amazonSearchItem, userGroup)
        badge1.getBadgeTypes()
        amazonSearchItem.badge1Platform = badge1.platformBadge
        amazonSearchItem.badge1Ecm = badge1.ecmBadge

        // 2 & 3
        const badge2 = new Badge2(searchResultElement, amazonSearchItem, userGroup)
        badge2.getBadgeTypes()
        amazonSearchItem.badge2Platform = badge2.platformBadge2
        amazonSearchItem.badge3Platform = badge2.platformBadge3
        amazonSearchItem.badge2Ecm = badge2.ecmBadge2
        amazonSearchItem.badge3Ecm = badge2.ecmBadge3

        // 4 & 5
        const badge4 = new Badge4(searchResultElement, amazonSearchItem, userGroup)
        badge4.getBadgeTypes()
        amazonSearchItem.badge4Platform = badge4.platformBadge4
        amazonSearchItem.badge5Platform = badge4.platformBadge5
        amazonSearchItem.badge4Ecm = badge4.ecmBadge4
        amazonSearchItem.badge5Ecm = badge4.ecmBadge5

        // 6
        const badge6 = new Badge6(searchResultElement, amazonSearchItem, userGroup)
        badge6.getBadgeTypes()
        amazonSearchItem.badge6Platform = badge6.platformBadge
        amazonSearchItem.badge6Ecm = badge6.ecmBadge

        // 7
        const badge7 = new Badge7(searchResultElement, amazonSearchItem, userGroup)
        badge7.getBadgeTypes()
        amazonSearchItem.badge7Platform = badge7.platformBadge
        amazonSearchItem.badge7Ecm = badge7.ecmBadge

        // 8
        const badge8 = new Badge8(searchResultElement, amazonSearchItem, userGroup)
        badge8.getBadgeTypes()
        amazonSearchItem.badge8Platform = badge8.platformBadge
        amazonSearchItem.badge8Ecm = badge8.ecmBadge

        ecmEventData.item = amazonSearchItem

        ecmDataLayer.events.push(ecmEventData)
    })
}

function isInViewport(htmlElement) {
    const rect = htmlElement.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}