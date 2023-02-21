export function getBadge1Info(el, amazonSearchItem, userGroup) {
    // Take this function as an instruction (make class??) for other badges
    let defaultBadge1 = undefined
    let ecmBadge1 = undefined

    if (el) {
        const defaultBadgeEl = el.querySelector("span.rush-component [data-component-type='s-status-badge-component']")

        if (defaultBadgeEl) {
            // There is a badge element present by default

            const badgeCompProps = defaultBadgeEl.getAttribute("data-component-props")

            const jsonProps = JSON.parse(badgeCompProps)
            defaultBadge1 = jsonProps["badgeType"]

            // What now? Was the badge
            //  Hidden (default behavior of blank css)
            //  Shown
            //  Replaced

            const defaultBadge1DisplayStyle = window.getComputedStyle(defaultBadgeEl, null).display

            if (defaultBadge1DisplayStyle === 'none') {
                // This should always be 'true', since 'display: none', i.e. the blank style is the default styling for the CE

                switch (userGroup) {
                    case 1:
                        // Blank Style, do nothing, keep the badge hidden
                        ecmBadge1 = "removed-platform"
                        break;

                    case 2:
                        // Platform style, do not hide the badge and display the "normal" (platform default) badge
                        defaultBadgeEl.style.display = "block"
                        break;

                    case 3:
                        // Custom style

                        // Option 1, modify an existing badge
                        defaultBadgeEl.style.display = "block"
                        defaultBadgeEl.querySelector("span.a-badge-text").textContent = "My Choice"
                        defaultBadgeEl.querySelector("span.a-badge-label").setAttribute("data-a-badge-color", "sx-purple")
                        ecmBadge1 = "ecm-style-1"

                        // Option 2, insert a custom badge (not done here)
                        break;

                    default:
                        // No Style (if userGroup is unknown apply the blank style)
                        ecmBadge1 = "removed-platform"
                        break;
                }
            }
        } else {
            // There is no bade element present by default

            switch (userGroup) {
                case 3:
                    // Custom style, insert a custom badge
                    if (amazonSearchItem.avgRating > 45) {
                        el.style.background = "lightblue"
                    }
                    break;

                default:
                    // Platform style, do nothing, no badge (platform or custom) will be attached
                    break;
            }
        }
    }
    return [defaultBadge1, ecmBadge1]
} 