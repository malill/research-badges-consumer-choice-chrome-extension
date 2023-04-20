// We inject the platform CSS in content script "index.js".
// We can't inject via chrome.scripting since this is only
// available in service workers. 

export const platformCSS = `
/* ---------------------- 
------ SEARCH PAGE ------
------------------------/*

/* --- BADGES --- */

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

/*Badge16, "Save more with Subscribe & Save"
https://www.amazon.co.uk/s?k=skin+care+sets+%26+kits&sprefix=skin+care+set%2Caps%2C84&ref=nb_sb_ss_ts-doa-p_2_13*/
.a-row.a-size-base.a-color-secondary {
    display: block !important;
}


/* --- PRODUCT ATTRIBUTES --- */

/*Delivery info, "Get it - date1 (to date2)FREE delivery by Amazon*/
div.a-row.a-size-base.a-color-secondary.s-align-children-center {
    display: block !important;
}

/*"Eligible for delivery to Germany"*/
span.a-size-small.a-color-base {
    display: block !important;
}
`