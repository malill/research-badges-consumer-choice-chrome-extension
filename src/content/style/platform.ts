// We inject the platform CSS in content script "index.js".
// We can't inject via chrome.scripting since this is only
// available in service workers. 

export const platformCSS = `
/*Badge1, Highlight (Best Seller, Amazon's Choice)*/
span.rush-component [data-component-type='s-status-badge-component'] {
    display: block !important;
}

/*Badge2 & 3, lightning red, Save X% OR Limited Time Deal*/
span[data-a-badge-color='sx-lightning-deal-red'] {
    display: block !important;
}

/*Badge4 & 5, green voucher, "Save x%" OR "Save x$" below product price*/
span[data-component-type="s-coupon-component"] {
    display: block !important;
}

/*Badge6, "Sponsored (i)" above product*/
a.puis-sponsored-label-text {
    display: block !important;
}

/*Badge7, strike price "annotation" (e.g. "RRP:", "Was:")*/
span.a-size-base.a-color-secondary {
    display: inline-block !important;
}

/*Badge7, strice price value*/
span.a-text-price[data-a-strike='true'] {
    display: inline-block !important;
}

/*Badge8, Prime (Delivery) Icon at product*/
i.a-icon-prime {
    display: inline-block !important;
}

/*Badge9, "Lowest price in 30 days"*/
span[aria-label="Lowest price in 30 days"] {
    display: block !important;
}

/*Badge10/11, More buying choices*/
.a-section.a-spacing-none.a-spacing-top-mini {
    display: block !important;
}

/*Badge12, "Only x left in stock"*/
span.a-size-base.a-color-price {
    display: block !important;
}

/*Badge14a, (Green) "Save x% on any y qualifying items"*/
.s-highlighted-text-padding {
    display: inline-block !important;
}

/*Badge14b, (Above Green) "X with subscribe & save discount*/
.a-row.a-size-small.a-color-secondary {
    display: block !important;
}

/*Badge15, Small Business*/
a.a-popover-trigger.a-declarative.s-no-underline.s-pc-badge.s-align-children-center {
    display: block !important;
}

/*Badge16, "Eligible for delivery to Germany"*/
span.a-size-small.a-color-base {
    display: block !important;
}

/*Badge17, "Get it - X to Y*/
div.a-row.a-size-base.a-color-secondary.s-align-children-center {
    display: block !important;
}
`