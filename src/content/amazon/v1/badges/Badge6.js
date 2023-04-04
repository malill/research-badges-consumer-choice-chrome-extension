import { ECM_BADGE_TYPE_REMOVED_PLATFORM, ECM_BADGE_TYPE_SPONSORED } from "../../../../config/constants"

export class Badge6 {
    constructor(htmlItemElement, amazonSearchItem, userGroup) {
        this.htmlItemElement = htmlItemElement
        this.amazonSearchItem = amazonSearchItem
        this.userGroup = userGroup
    }

    getBadgeTypes() {
        const platformBadgeEl = this.htmlItemElement.querySelector("a.puis-sponsored-label-text")
        if (platformBadgeEl) {
            this.platformBadge = ECM_BADGE_TYPE_SPONSORED

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