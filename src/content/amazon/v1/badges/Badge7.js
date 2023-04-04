import { ECM_BADGE_TYPE_REMOVED_PLATFORM, ECM_BADGE_TYPE_SPONSORED } from "../../../../config/constants"

export class Badge7 {
    constructor(htmlItemElement, amazonSearchItem, userGroup) {
        this.htmlItemElement = htmlItemElement
        this.amazonSearchItem = amazonSearchItem
        this.userGroup = userGroup
    }

    getBadgeTypes() {
        const platformBadgeEl = this.htmlItemElement.querySelector("span.a-text-price[data-a-strike='true']")

        if (platformBadgeEl) {
            const strikePriceEl = platformBadgeEl.children[0]

            this.platformBadge = parseInt(strikePriceEl.textContent.substring(1).replaceAll(',', '').replaceAll('.', ''))

            const platformBadgeDisplayStyle = window.getComputedStyle(platformBadgeEl, null).display

            if (platformBadgeDisplayStyle === 'none') {
                switch (this.userGroup) {
                    case 1:
                        this.ecmBadge = ECM_BADGE_TYPE_REMOVED_PLATFORM
                        break;
                    case 2:
                        // Platform style, do not hide the badge and display the "normal" (platform default) badge
                        platformBadgeEl.style.display = "block"
                        break;
                    default:
                        this.ecmBadge = ECM_BADGE_TYPE_REMOVED_PLATFORM
                        break;
                }
            }
        }
    }

}