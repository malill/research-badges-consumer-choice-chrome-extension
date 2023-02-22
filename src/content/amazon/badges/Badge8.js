import { ECM_BADGE_TYPE_PRIME_ICON, ECM_BADGE_TYPE_REMOVED_PLATFORM } from "../../../config/constants"

export class Badge8 {
    constructor(htmlItemElement, amazonSearchItem, userGroup) {
        this.htmlItemElement = htmlItemElement
        this.amazonSearchItem = amazonSearchItem
        this.userGroup = userGroup
    }

    getBadgeTypes() {
        const platformBadgeEl = this.htmlItemElement.querySelector("i.a-icon-prime")
        if (platformBadgeEl) {
            this.platformBadge = ECM_BADGE_TYPE_PRIME_ICON

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