export class AmazonSearchItem {
    constructor(htmlmSearchResultElement) {
        // Basic attributes

        // ID
        this.asin = htmlmSearchResultElement.getAttribute("data-asin");

        // POSITION
        this.position = parseInt(htmlmSearchResultElement.getAttribute("data-index"));

        // NAME
        try {
            const nameEl = htmlmSearchResultElement.querySelector("h2");
            this.name = nameEl.textContent.trim();
        } catch (error) {
            // Item name could not be found
        }

        // AVG RATING & NUMBER OF REVIEWS
        try {
            const ratingEl = htmlmSearchResultElement.getElementsByClassName("a-section a-spacing-none a-spacing-top-micro")[0];
            this.avgRating = parseFloat(ratingEl.getElementsByClassName("a-size-base")[0].textContent.replace(/[{()},.]/g, ''));
            this.nReviews = parseFloat(ratingEl.getElementsByClassName("a-size-base s-underline-text")[0].textContent.replace(/[{()},.]/g, ''));
        } catch (error) {
            // No rating element found
        }

        // PRICE
        try {
            const priceEl = htmlmSearchResultElement.querySelector("span.a-price > span.a-offscreen");
            const priceValue = parseFloat(priceEl.textContent.replace(/\D/g, ''));
            this.price = priceValue;
        } catch (error) {
            // No price element found
        }

        // DELIVERY TIME (TODO: should be a badge (since removed by extension))
        try {
            const dlvTimeString = htmlmSearchResultElement.querySelector("div.a-row.a-size-base.a-color-secondary.s-align-children-center");
            this.deliveryInfo = dlvTimeString.textContent.trim();
        } catch (error) {
            // No delivery info present
        }

        this.badges = this.getBadges();
    }

    getBadges() {
        // TODO: implement badge logic
        return { 1: "a", 2: "b", 4: "d", 5: 5 };
    }
}