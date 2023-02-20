export function getBadge1Info(el, amazonSearchItem, userGroup) {
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
                // THIS IS (should) ALWAYS BE TRUE?

                switch (userGroup) {
                    case 1:
                        // No Style
                        ecmBadge1 = "removed-platform"
                        break;


                    case 2:
                        // Platform style
                        defaultBadgeEl.style.display = "block"
                        break;

                    case 3:
                        // Custom style
                        defaultBadgeEl.style.display = "block"
                        defaultBadgeEl.querySelector("span.a-badge-text").textContent = "My Choice"
                        console.log(defaultBadgeEl)
                        defaultBadgeEl.querySelector("span.a-badge-label").setAttribute("data-a-badge-color", "sx-purple")
                        ecmBadge1 = "ecm-style-1"
                        break;

                    default:
                        // No Style
                        ecmBadge1 = "removed-platform"
                        break;
                }
            }
        } else {
            // There is no bade element present by default

            switch (userGroup) {
                case 3:
                    if (amazonSearchItem.avgRating > 45) {
                        el.style.background = "lightblue"
                    }
                    break;

                default:
                    break;
            }

            // What now? There was no badge, but do you want to 
            //  Do nothing (no problem)
            //  Display a ECM badge
        }
    }
    return [defaultBadge1, ecmBadge1]
} 