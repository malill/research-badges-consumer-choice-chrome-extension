import { ECM_BADGE_TYPE_REMOVED_PLATFORM } from "../../../config/constants"

export class Badge4 {
    constructor(htmlItemElement, amazonSearchItem, userGroup) {
        this.htmlItemElement = htmlItemElement
        this.amazonSearchItem = amazonSearchItem
        this.userGroup = userGroup
    }

    getBadgeTypes() {
        const platformBadgeEl = this.htmlItemElement.querySelector("span[data-component-type='s-coupon-component']")

        if (platformBadgeEl) {
            const couponText = platformBadgeEl.textContent

            const platformBadgeDisplayStyle = window.getComputedStyle(platformBadgeEl, null).display

            if (couponText.includes("%")) {
                // String is something like "Save x% with voucher"
                const couponSavePercent = parseInt(couponText.substring(0, couponText.indexOf("%")))
                this.platformBadge4 = couponSavePercent
                if (platformBadgeDisplayStyle === 'none') {
                    switch (this.userGroup) {
                        case 1:
                            this.ecmBadge4 = ECM_BADGE_TYPE_REMOVED_PLATFORM
                            break;
                        case 2:
                            // Platform style, do not hide the badge and display the "normal" (platform default) badge
                            platformBadgeEl.style.display = "block"
                            break;
                        default:
                            this.ecmBadge4 = ECM_BADGE_TYPE_REMOVED_PLATFORM
                            break;
                    }
                }
            } else {
                // String is something like "Save x$ with voucher"
                const couponSaveAmount = parseInt(couponText.substring(1, couponText.indexOf(" ")))
                this.platformBadge5 = couponSaveAmount
                if (platformBadgeDisplayStyle === 'none') {
                    switch (this.userGroup) {
                        case 1:
                            this.ecmBadge5 = ECM_BADGE_TYPE_REMOVED_PLATFORM
                            break;
                        case 2:
                            // Platform style, do not hide the badge and display the "normal" (platform default) badge
                            platformBadgeEl.style.display = "block"
                            break;
                        default:
                            this.ecmBadge5 = ECM_BADGE_TYPE_REMOVED_PLATFORM
                            break;
                    }
                }
            }

        }
    }
}