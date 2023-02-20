export function getBadge1Info(el) {
    let badge1 = undefined

    if (el) {
        const badgeEl = el.querySelector("span.rush-component [data-component-type='s-status-badge-component']")


        if (badgeEl) {
            const badgeCompProps = badgeEl.getAttribute("data-component-props")

            const jsonProps = JSON.parse(badgeCompProps)
            badge1 = jsonProps["badgeType"]
        }
    }
    return badge1
} 