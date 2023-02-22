import { ECM_BADGE_TYPE_REMOVED_PLATFORM } from "../../../config/constants"

export class Badge1 {
    // Take this as inspiration for other Badge classes

    constructor(htmlItemElement, amazonSearchItem, userGroup) {
        this.htmlItemElement = htmlItemElement
        this.amazonSearchItem = amazonSearchItem
        this.userGroup = userGroup
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
                        this.ecmBadge = ECM_BADGE_TYPE_REMOVED_PLATFORM
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
                        this.ecmBadge = ECM_BADGE_TYPE_REMOVED_PLATFORM
                        break;
                }
            }
        } else {
            // There is no bade element present by default

            switch (this.userGroup) {
                case 3:
                    // Custom style, insert a custom badge
                    // if (this.amazonSearchItem.avgRating > 45) {
                    //     // this.htmlItemElement.insertBefore(this.getEcmBadgeHTMLElement(), this.htmlItemElement.firstChild)
                    //     const html = `<span style="display: block" data-component-type="s-status-badge-component" class="rush-component" data-component-props="{&quot;badgeType&quot;:&quot;best-seller&quot;,&quot;asin&quot;:&quot;B000G2Z4VW&quot;}" data-component-id="19"><div class="a-row a-badge-region"><span id="B000G2Z4VW-best-seller" class="a-badge" aria-labelledby="B000G2Z4VW-best-seller-label B000G2Z4VW-best-seller-supplementary" data-a-badge-supplementary-position="right" tabindex="0" data-a-badge-type="status"><span id="B000G2Z4VW-best-seller-label" class="a-badge-label" data-a-badge-color="sx-purple" aria-hidden="true"><span class="a-badge-label-inner a-text-ellipsis"><span class="a-badge-text" data-a-badge-color="sx-cloud">High Rating</span></span></span></span></div></span>`
                    //     const node = new DOMParser().parseFromString(html, "text/html").body.firstElementChild
                    //     this.htmlItemElement.insertBefore(node, this.htmlItemElement.children[0])
                    // }
                    // this.ecmBadge = "high-rating"
                    break;

                default:
                    // Platform style, do nothing, no badge (platform or custom) will be attached
                    break;
            }
        }
    }

}