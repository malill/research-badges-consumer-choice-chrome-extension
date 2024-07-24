// We inject the platform CSS in content script "index.js".
// We can't inject via chrome.scripting since this is only
// available in service workers. 
// src\style\amazon\blank_search.css is applied, we need to
// revert the respective CSS changes.

// DISPLAY AMAZON'S CHOICE BADGE
export const modCSS_01 = `
/* --- BADGES --- */
/*Badge1, Highlight (Best Seller, Amazon's Choice)*/
span.rush-component [data-component-props*='amazons-choice'] {
    display: block !important;
}
`

// DISPLAY BESTSELLER BADGE
export const modCSS_02 = `
/* --- BADGES --- */
/*Badge1, Highlight (Best Seller, Amazon's Choice)*/
span.rush-component [data-component-props*='best-seller'] {
    display: block !important;
}
`

// DISPLAY ALL BADGES
export const modCSS_03 = `
/* --- BADGES --- */
/*Badge1, Highlight (Best Seller, Amazon's Choice)*/
span.rush-component [data-component-type='s-status-badge-component'],
/*Badge2 & 3, lightning red, Save X% OR Limited Time Deal*/
/*span[data-a-badge-color='sx-lightning-deal-red'],*/
span[data-a-badge-type="deal"],
/*Badge4 & 5, green voucher, "Save x%" OR "Save x$" below product price*/
span[data-component-type="s-coupon-component"],
/*Badge6, "Sponsored (i)" above product*/
a.puis-sponsored-label-text,
/*Badge8, Prime (Delivery) Icon at product*/
i.a-icon-prime,
/*Badge9, "Lowest price in 30 days"*/
span[aria-label="Lowest price in 30 days"],
/*Badge13, Small Business & Climate Pledge Friendly*/
a.a-popover-trigger.a-declarative.s-no-underline.s-pc-badge.s-align-children-center,
div[data-cy="certification-recipe"],
/*Badge14a, (Green) "Save x% on any y qualifying items"*/
span.a-size-base.s-highlighted-text-padding.aok-inline-block.s-promotion-highlight-color,
/*Badge14b, (Above Green) "X with subsribe & save discount*/
.a-row.a-size-small.a-color-secondary,
/*Badge15, "Featured from our brands"*/
span.a-size-micro.a-color-secondary,
/*Badge16, "Save more with Subscribe & Save"*/
.a-row.a-size-base.a-color-secondary {
    display: block !important;
}
`