export class Badge2 {
    constructor(htmlItemElement, amazonSearchItem, userGroup) {
        this.htmlItemElement = htmlItemElement
        this.amazonSearchItem = amazonSearchItem
        this.userGroup = userGroup
    }

    getBadgeTypes() {
        const platformBadgeEl = this.htmlItemElement.querySelector("span[data-a-badge-color='sx-lightning-deal-red']")

        if (platformBadgeEl) {
            const txt = platformBadgeEl.textContent
            const txtSavePercent = parseInt(txt.substring(txt.indexOf(" ") + 1, txt.indexOf("%")))

            const platformBadgeDisplayStyle = window.getComputedStyle(platformBadgeEl, null).display

            if (isNaN(txtSavePercent)) {
                // String is something like "Limited Time Deal"
                this.platformBadge3 = txt
                if (platformBadgeDisplayStyle === 'none') {
                    switch (this.userGroup) {
                        case 1:
                            this.ecmBadge3 = "removed-platform"
                            break;
                        case 2:
                            // Platform style, do not hide the badge and display the "normal" (platform default) badge
                            platformBadgeEl.style.display = "block"
                            break;
                        default:
                            this.ecmBadge3 = "removed-platform"
                            break;
                    }
                }
            } else {
                // String is something like "Save x%"
                this.platformBadge2 = txtSavePercent
                if (platformBadgeDisplayStyle === 'none') {
                    switch (this.userGroup) {
                        case 1:
                            this.ecmBadge2 = "removed-platform"
                            break;
                        case 2:
                            // Platform style, do not hide the badge and display the "normal" (platform default) badge
                            platformBadgeEl.style.display = "block"
                            break;
                        default:
                            this.ecmBadge2 = "removed-platform"
                            break;
                    }
                }
            }

        }
    }
}