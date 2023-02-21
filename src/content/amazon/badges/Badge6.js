export class Badge6 {
    constructor(htmlItemElement, amazonSearchItem, userGroup) {
        this.htmlItemElement = htmlItemElement
        this.amazonSearchItem = amazonSearchItem
        this.userGroup = userGroup

        this.ecmBadge = undefined
        this.platformBadge = undefined
    }

    getBadgeTypes() {
        const platformBadgeEl = this.htmlItemElement.querySelector("a.puis-sponsored-label-text")
        if (platformBadgeEl) {
            this.platformBadge = "sponsored"

            const platformBadgeDisplayStyle = window.getComputedStyle(platformBadgeEl, null).display

            if (platformBadgeDisplayStyle === 'none') {
                this.ecmBadge = "removed-platform"
            }
        }
    }

}