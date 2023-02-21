export class Badge1 {
    // Take this as inspiration for other Badge classes

    constructor(htmlItemElement, amazonSearchItem, userGroup) {
        this.htmlItemElement = htmlItemElement
        this.amazonSearchItem = amazonSearchItem
        this.userGroup = userGroup

        this.ecmBadge = undefined
        this.platformBadge = undefined
    }

    getEcmBadgeHTMLElement() {
        const p = document.createElement('p');
        p.innerText = 'Your Selection';
        return p
    }

    getBadgeTypes() {
        const platformBadgeEl = this.htmlItemElement.querySelector("span.rush-component [data-component-type='s-status-badge-component']")

        if (platformBadgeEl) {
            // There is a badge element present by default

            const badgeCompProps = platformBadgeEl.getAttribute("data-component-props")

            const jsonProps = JSON.parse(badgeCompProps)
            this.platformBadge = jsonProps["badgeType"]

            const platformBadgeDisplayStyle = window.getComputedStyle(platformBadgeEl, null).display

            if (platformBadgeDisplayStyle === 'none') {
                // This should always be 'true', since 'display: none', i.e. the blank style is the default styling for the CE

                switch (this.userGroup) {
                    case 1:
                        // Blank Style, do nothing, keep the badge hidden
                        this.ecmBadge = "removed-platform"
                        break;

                    case 2:
                        // Platform style, do not hide the badge and display the "normal" (platform default) badge
                        platformBadgeEl.style.display = "block"
                        break;

                    case 3:
                        // Custom style

                        // Option 1, modify an existing badge
                        platformBadgeEl.style.display = "block"
                        platformBadgeEl.querySelector("span.a-badge-label-inner").textContent = "My Choice"
                        platformBadgeEl.querySelector("span.a-badge-label").setAttribute("data-a-badge-color", "sx-purple")

                        // Option 2, insert a custom badge
                        // this.htmlItemElement.insertBefore(this.getEcmBadgeHTMLElement(), this.htmlItemElement.firstChild)

                        this.ecmBadge = "my-choice"
                        break;

                    default:
                        // No Style (if userGroup is unknown apply the blank style)
                        this.ecmBadge = "removed-platform"
                        break;
                }
            }
        } else {
            // There is no bade element present by default

            switch (this.userGroup) {
                case 3:
                    // Custom style, insert a custom badge
                    if (this.amazonSearchItem.avgRating > 45) {
                        this.htmlItemElement.insertBefore(this.getEcmBadgeHTMLElement(), this.htmlItemElement.firstChild)
                    }
                    break;

                default:
                    // Platform style, do nothing, no badge (platform or custom) will be attached
                    break;
            }
        }
    }

}