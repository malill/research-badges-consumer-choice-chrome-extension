// We inject the platform CSS in content script "index.js".
// We can't inject via chrome.scripting since this is only
// available in service workers. 

export const modCSS_01 = `
/*---blank_search.css---/*

/* --- BADGES --- */
/*Badge1, Highlight (Best Seller, Amazon's Choice)*/
span.rush-component [data-component-props*='best-seller'] {
    display: block !important;
}
`