export class AmazonItem {
    htmlElement: HTMLElement; // -> not sent to server
    asin: string;
    avg_rating: number;
    delivery_info: string;
    n_ratings: number;
    name: string;
    position: number;
    price: number;
    img_url: string;
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
            this.avg_rating = parseFloat(avgRatingTxt.slice(0, 3)) * 10;
            this.n_ratings = parseFloat(ratingEl.getElementsByClassName("a-size-base s-underline-text")[0].textContent.replace(/[{()},.]/g, ''));
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
            this.delivery_info = dlvTimeString.textContent.trim();
        } catch (error) {
            // No delivery info present
        }

        // ITEM IMAGE URL
        try {
            this.img_url = this.htmlElement.querySelector("img.s-image").getAttribute('src');
        } catch (error) { }

        this.badges = this.getBadges();
    }

    getBadges() {
        let badges = {};
        try {
            let platformBadgeEl = this.htmlElement.querySelector("span.rush-component [data-component-type='s-status-badge-component']");
            let badgeCompProps = platformBadgeEl.getAttribute("data-component-props");
            let jsonProps = JSON.parse(badgeCompProps);
            let platformBadgeDisplayStyle = window.getComputedStyle(platformBadgeEl, null).display;
            badges["b_01"] = jsonProps["badgeType"];
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("span[data-a-badge-color='sx-lightning-deal-red']");
            let lightningDealText = platformBadgeEl.textContent;
            let lightningDealSavePercent = parseInt(lightningDealText.substring(lightningDealText.indexOf(" ") + 1, lightningDealText.indexOf("%")));
            let platformBadgeDisplayStyle = window.getComputedStyle(platformBadgeEl, null).display;
            if (isNaN(lightningDealSavePercent)) {
                // String is something like "Limited Time Deal"
                badges["b_03"] = lightningDealText.toLowerCase();
            } else {
                badges["b_02"] = lightningDealSavePercent;
            }
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("span[data-component-type='s-coupon-component']");
            let couponText = platformBadgeEl.textContent;
            if (couponText.includes("%")) {
                // String is something like "Save x% with voucher"
                const couponSavePercent = parseInt(couponText.substring(0, couponText.indexOf("%")));
                badges["b_04"] = couponSavePercent;
            } else {
                const couponSaveAmount = parseInt(couponText.substring(1, couponText.indexOf(" ")));
                badges["b_05"] = couponSaveAmount;
            }
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("a.puis-sponsored-label-text");
            badges["b_06"] = platformBadgeEl.firstChild.textContent.toLowerCase();
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("span.a-text-price[data-a-strike='true']");
            let strikePriceEl = platformBadgeEl.children[0];
            badges["b_07"] = parseInt(strikePriceEl.textContent.substring(1).replaceAll(',', '').replaceAll('.', ''));
            let platformBadgeDisplayStyle = window.getComputedStyle(platformBadgeEl, null).display;
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("i.a-icon-prime");
            let badgeCompProps = platformBadgeEl.getAttribute("aria-label").toLowerCase();
            badges["b_08"] = badgeCompProps;
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("span[aria-label='Lowest price in 30 days']");
            badges["b_09"] = platformBadgeEl.firstChild.textContent.toLowerCase();
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

        // TEMPORARILY OUT OF STOCK (also badge12 -> stock:=0)
        try {
            const outOfStockEl = this.htmlElement.querySelector("span[aria-label='Temporarily out of stock.']");
            if (outOfStockEl.textContent.includes("Temporarily out of stock")) {
                badges["b_12"] = 0;
            }
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("a.a-popover-trigger.a-declarative.s-no-underline.s-pc-badge.s-align-children-center");
            let textEl = platformBadgeEl.textContent;
            badges["b_13"] = textEl.trim().toLowerCase();
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("span.a-size-base.s-highlighted-text-padding.aok-inline-block.s-promotion-highlight-color");
            badges["b_14"] = platformBadgeEl.textContent;
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("span.a-size-micro.a-color-secondary");
            let textEl = platformBadgeEl.textContent;
            badges["b_15"] = textEl.trim().toLowerCase();
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
            badges["b_17"] = textEl.trim().toLowerCase();
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("img.s-image-logo-alm");
            badges["b_18"] = platformBadgeEl.getAttribute("alt").trim().toLowerCase();
        } catch (error) { }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("span.a-size-base.a-color-secondary");
            badges["b_19"] = platformBadgeEl.textContent.trim().toLowerCase();
        } catch (error) { }

        return badges;
    }
}