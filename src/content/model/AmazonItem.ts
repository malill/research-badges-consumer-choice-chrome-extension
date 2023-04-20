export class AmazonItem {
    htmlElement: HTMLElement;
    asin: string;
    position: number;
    name: string;
    avgRating: number;
    nReviews: number;
    price: number;
    deliveryInfo: string;
    outOfStockTxt: string;
    badges: {};

    constructor(htmlmSearchResultElement: HTMLElement, asin?: string) {
        if (asin) {
            this.asin = asin;
            return this;
        }

        this.htmlElement = htmlmSearchResultElement;

        // Basic attributes

        // ID
        this.asin = this.htmlElement.getAttribute("data-asin");

        // POSITION
        this.position = parseInt(this.htmlElement.getAttribute("data-index"));

        // NAME
        try {
            const nameEl = this.htmlElement.querySelector("h2");
            this.name = nameEl.textContent.trim();
        } catch (error) {
            // Item name could not be found
        }

        // AVG RATING & NUMBER OF REVIEWS
        try {
            const ratingEl = this.htmlElement.getElementsByClassName("a-section a-spacing-none a-spacing-top-micro")[0];
            let avgRatingTxt = ratingEl.getElementsByClassName("a-icon-alt")[0].textContent;
            this.avgRating = parseFloat(avgRatingTxt.slice(0, 3)) * 10;
            this.nReviews = parseFloat(ratingEl.getElementsByClassName("a-size-base s-underline-text")[0].textContent.replace(/[{()},.]/g, ''));
        } catch (error) {
            // No rating element found
        }

        // PRICE
        try {
            const priceEl = this.htmlElement.querySelector("span.a-price > span.a-offscreen");
            const priceValue = parseFloat(priceEl.textContent.replace(/\D/g, ''));
            this.price = priceValue;
        } catch (error) {
            // No price element found
        }

        // DELIVERY TIME (TODO: should be a badge (since removed by extension))
        try {
            const dlvTimeString = this.htmlElement.querySelector("div.a-row.a-size-base.a-color-secondary.s-align-children-center");
            this.deliveryInfo = dlvTimeString.textContent.trim();
        } catch (error) {
            // No delivery info present
        }

        // TEMPORARILY OUT OF STOCK
        try {
            const outOfStockEl = this.htmlElement.querySelector("span[aria-label='Temporarily out of stock.']");
            if (outOfStockEl.textContent.includes("Temporarily out of stock")) {
                this.outOfStockTxt = outOfStockEl.textContent.trim().toLowerCase().replaceAll(" ", "-");
            }
        } catch (error) {
        }

        this.badges = this.getBadges();
    }

    getBadges() {
        let badges = {};
        try {
            let platformBadgeEl = this.htmlElement.querySelector("span.rush-component [data-component-type='s-status-badge-component']");
            let badgeCompProps = platformBadgeEl.getAttribute("data-component-props");
            let jsonProps = JSON.parse(badgeCompProps);
            let platformBadgeDisplayStyle = window.getComputedStyle(platformBadgeEl, null).display;
            badges["b_1"] = jsonProps["badgeType"];
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("span[data-a-badge-color='sx-lightning-deal-red']");
            let lightningDealText = platformBadgeEl.textContent;
            let lightningDealSavePercent = parseInt(lightningDealText.substring(lightningDealText.indexOf(" ") + 1, lightningDealText.indexOf("%")));
            let platformBadgeDisplayStyle = window.getComputedStyle(platformBadgeEl, null).display;
            if (isNaN(lightningDealSavePercent)) {
                // String is something like "Limited Time Deal"
                badges["b_3"] = lightningDealText.toLowerCase().replaceAll(" ", "-");
            } else {
                badges["b_2"] = lightningDealSavePercent;
            }
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("span[data-component-type='s-coupon-component']");
            let couponText = platformBadgeEl.textContent;
            if (couponText.includes("%")) {
                // String is something like "Save x% with voucher"
                const couponSavePercent = parseInt(couponText.substring(0, couponText.indexOf("%")));
                badges["b_4"] = couponSavePercent;
            } else {
                const couponSaveAmount = parseInt(couponText.substring(1, couponText.indexOf(" ")));
                badges["b_5"] = couponSaveAmount;
            }
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("a.puis-sponsored-label-text");
            badges["b_6"] = platformBadgeEl.firstChild.textContent.toLowerCase();
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("span.a-text-price[data-a-strike='true']");
            let strikePriceEl = platformBadgeEl.children[0];
            badges["b_7"] = parseInt(strikePriceEl.textContent.substring(1).replaceAll(',', '').replaceAll('.', ''));
            let platformBadgeDisplayStyle = window.getComputedStyle(platformBadgeEl, null).display;
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("i.a-icon-prime");
            let badgeCompProps = platformBadgeEl.getAttribute("aria-label").toLowerCase().replaceAll(" ", "-");
            badges["b_8"] = badgeCompProps;
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("span[aria-label='Lowest price in 30 days']");
            badges["b_9"] = platformBadgeEl.firstChild.textContent.toLowerCase().replaceAll(" ", "-");
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector(".a-section.a-spacing-none.a-spacing-top-mini");
            let textEl = platformBadgeEl.textContent;
            let openingParanIndex = textEl.indexOf("(");
            let currencySymbolIndex = textEl.indexOf("£");
            let paranSubstring = textEl.substring(openingParanIndex);

            badges["b_10"] = parseFloat(textEl.substring(currencySymbolIndex + 1, openingParanIndex)) * 100;
            badges["b_11"] = parseInt(paranSubstring.substring(1, paranSubstring.indexOf(" ")));
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("span.a-size-base.a-color-price");
            let textEl = platformBadgeEl.textContent;
            textEl = textEl.substring(textEl.indexOf(" "));
            badges["b_12"] = parseInt(textEl.substring(0, textEl.indexOf("left")));
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("a.a-popover-trigger.a-declarative.s-no-underline.s-pc-badge.s-align-children-center");
            let textEl = platformBadgeEl.textContent;
            badges["b_13"] = textEl.trim().toLowerCase().replaceAll(" ", "-");
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("span.a-size-base.s-highlighted-text-padding.aok-inline-block.s-promotion-highlight-color");
            badges["b_14"] = platformBadgeEl.textContent;
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("span.a-size-micro.a-color-secondary");
            let textEl = platformBadgeEl.textContent;
            badges["b_15"] = textEl.trim().toLowerCase().replaceAll(" ", "-");
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector(".a-row.a-size-base.a-color-secondary>div");
            let textEl = platformBadgeEl.textContent;
            // textEl contains also contains the delivery info
            if (textEl.includes("Subscribe & Save")) {
                badges["b_16"] = "subscribe-and-save";
            }
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("div.a-section.a-spacing-none.a-spacing-top-micro.s-product-grid-adjustment");
            let textEl = platformBadgeEl.textContent;
            badges["b_17"] = textEl.trim().toLowerCase().replaceAll(" ", "-");
        } catch (error) { }

        return badges;
    }
}