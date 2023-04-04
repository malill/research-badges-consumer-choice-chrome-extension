import { ECM_BADGE_TYPE_REMOVED_PLATFORM } from "../../../../config/constants"

export class Badge2 {
    constructor(htmlItemElement, amazonSearchItem, userGroup) {
        this.htmlItemElement = htmlItemElement
        this.amazonSearchItem = amazonSearchItem
        this.userGroup = userGroup
    }

    getBadgeTypes() {
        const platformBadgeEl = this.htmlItemElement.querySelector("span[data-a-badge-color='sx-lightning-deal-red']")

        if (platformBadgeEl) {
            const lightningDealText = platformBadgeEl.textContent
            const lightningDealSavePercent = parseInt(lightningDealText.substring(lightningDealText.indexOf(" ") + 1, lightningDealText.indexOf("%")))

            const platformBadgeDisplayStyle = window.getComputedStyle(platformBadgeEl, null).display

            if (isNaN(lightningDealSavePercent)) {
                // String is something like "Limited Time Deal"
                this.platformBadge3 = lightningDealText.toLowerCase().replaceAll(" ", "-")
                if (platformBadgeDisplayStyle === 'none') {
                    switch (this.userGroup) {
                        case 1:
                            this.ecmBadge3 = ECM_BADGE_TYPE_REMOVED_PLATFORM
                            break;
                        case 2:
                            // Platform style, do not hide the badge and display the "normal" (platform default) badge
                            platformBadgeEl.style.display = "block"
                            break;
                        default:
                            this.ecmBadge3 = ECM_BADGE_TYPE_REMOVED_PLATFORM
                            break;
                    }
                }
            } else {
                // String is something like "Save x%"
                this.platformBadge2 = lightningDealSavePercent
                if (platformBadgeDisplayStyle === 'none') {
                    switch (this.userGroup) {
                        case 1:
                            this.ecmBadge2 = ECM_BADGE_TYPE_REMOVED_PLATFORM
                            break;
                        case 2:
                            // Platform style, do not hide the badge and display the "normal" (platform default) badge
                            platformBadgeEl.style.display = "block"
                            break;
                        default:
                            this.ecmBadge2 = ECM_BADGE_TYPE_REMOVED_PLATFORM
                            break;
                    }
                }
            }

        }
    }
}