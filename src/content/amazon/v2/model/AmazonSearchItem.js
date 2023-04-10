export class AmazonSearchItem {
    constructor(htmlmSearchResultElement) {
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
            this.avgRating = parseFloat(ratingEl.getElementsByClassName("a-size-base")[0].textContent.replace(/[{()},.]/g, ''));
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

        this.badges = this.getBadges();
        console.log(this.badges);
    }

    getBadges() {
        let badges = {};
        try {
            let platformBadgeEl = this.htmlElement.querySelector("span.rush-component [data-component-type='s-status-badge-component']");
            let badgeCompProps = platformBadgeEl.getAttribute("data-component-props");
            let jsonProps = JSON.parse(badgeCompProps);
            let platformBadgeDisplayStyle = window.getComputedStyle(platformBadgeEl, null).display;
            badges[1] = jsonProps["badgeType"];
        } catch (error) {

        }
        try {
            let platformBadgeEl = this.htmlElement.querySelector("span[data-a-badge-color='sx-lightning-deal-red']");
            let lightningDealText = platformBadgeEl.textContent;
            let lightningDealSavePercent = parseInt(lightningDealText.substring(lightningDealText.indexOf(" ") + 1, lightningDealText.indexOf("%")));
            let platformBadgeDisplayStyle = window.getComputedStyle(platformBadgeEl, null).display;
            if (isNaN(lightningDealSavePercent)) {
                // String is something like "Limited Time Deal"
                badges[3] = lightningDealText.toLowerCase().replaceAll(" ", "-");
            } else {
                badges[2] = lightningDealSavePercent;
            }
        } catch (error) {
        }

        try {
            const platformBadgeEl = this.htmlElement.querySelector("span[data-component-type='s-coupon-component']");
            const couponText = platformBadgeEl.textContent;
            let platformBadgeDisplayStyle = window.getComputedStyle(platformBadgeEl, null).display;
            if (couponText.includes("%")) {
                // String is something like "Save x% with voucher"
                const couponSavePercent = parseInt(couponText.substring(0, couponText.indexOf("%")));
                badges[4] = couponSavePercent;
            } else {
                const couponSaveAmount = parseInt(couponText.substring(1, couponText.indexOf(" ")));
                badges[5] = couponSaveAmount;
            }
        } catch (error) {
        }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("a.puis-sponsored-label-text");
            badges[6] = platformBadgeEl.firstChild.textContent.toLowerCase();
            let platformBadgeDisplayStyle = window.getComputedStyle(platformBadgeEl, null).display;
        } catch (error) {
        }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("span.a-text-price[data-a-strike='true']");
            let strikePriceEl = platformBadgeEl.children[0];
            badges[7] = parseInt(strikePriceEl.textContent.substring(1).replaceAll(',', '').replaceAll('.', ''));
            let platformBadgeDisplayStyle = window.getComputedStyle(platformBadgeEl, null).display;
        } catch (error) {
        }

        try {
            let platformBadgeEl = this.htmlElement.querySelector("i.a-icon-prime");
            let badgeCompProps = platformBadgeEl.getAttribute("aria-label").toLowerCase().replaceAll(" ", "-");
            badges[8] = badgeCompProps;
        } catch (error) {
        }

        return badges;
    }
}