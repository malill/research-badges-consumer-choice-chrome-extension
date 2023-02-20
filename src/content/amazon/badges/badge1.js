export function getBadge1Info(el) {
    let defaultBadge1 = undefined
    let ecmBadge1 = undefined

    if (el) {
        const defaultBadgeEl = el.querySelector("span.rush-component [data-component-type='s-status-badge-component']")

        if (defaultBadgeEl) {
            const badgeCompProps = defaultBadgeEl.getAttribute("data-component-props")

            const jsonProps = JSON.parse(badgeCompProps)
            defaultBadge1 = jsonProps["badgeType"]
            const defaultBadge1DisplayStyle = window.getComputedStyle(defaultBadgeEl, null).display
            if (defaultBadge1DisplayStyle === 'none') {
                ecmBadge1 = 'removed default'
            }
        }
    }
    return [defaultBadge1, ecmBadge1]
} 