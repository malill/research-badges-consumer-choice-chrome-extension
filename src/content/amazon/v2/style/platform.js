// We inject the platform CSS in content script "index.js".
// We can't inject via chrome.scripting since this is only
// available in service workers. 

export const platformCSS = `
/*Badge1, Highlight (Best Seller, Amazon's Choice)*/
span.rush-component [data-component-type='s-status-badge-component'] {
    display: block;
}

/*Badge2 & 3, lightning red, Save X% OR Limited Time Deal*/
span[data-a-badge-color='sx-lightning-deal-red'] {
    display: block;
}

/*Badge4 & 5, green voucher, "Save x%" OR "Save x$" below product price*/
span[data-component-type="s-coupon-component"] {
    display: block;
}

/*Badge6, "Sponsored (i)" above product*/
a.puis-sponsored-label-text {
    display: block;
}

/*Badge7, strice price*/
span.a-text-price[data-a-strike='true'] {
    display: inline-block !important;
}

/*Badge8, Prime (Delivery) Icon at product*/
i.a-icon-prime {
    display: block;
}

/*Badge10/11, More buying choices*/
.a-section.a-spacing-none.a-spacing-top-mini {
    display: block !important;
}

/*Badge12, "Only x left in stock"*/
span.a-size-base.a-color-price {
    display: block !important;
}

/*Badge13, Small Business & Climate Pledge Friendly*/
a.a-popover-trigger.a-declarative.s-no-underline.s-pc-badge.s-align-children-center {
    display: block !important;
}

/*Badge14a, (Green) "Save x% on any y qualifying items"*/
span.a-size-base.s-highlighted-text-padding.aok-inline-block.s-promotion-highlight-color {
    display: inline-block !important;
}

/*Badge14b, (Above Green) "X with subscribe & save discount*/
.a-row.a-size-small.a-color-secondary {
    display: block !important;
}

/*Badge15, "Featured from our brands"*/
span.a-size-micro.a-color-secondary {
    display: block !important;
}

/*Badge16, "Eligible for delivery to Germany"*/
span.a-size-small.a-color-base {
    display: block !important;
}

/*Badge17, "Get it - X to Y*/
.a-row.a-size-base.a-color-secondary.s-align-children-center {
    display: block !important;
}
`