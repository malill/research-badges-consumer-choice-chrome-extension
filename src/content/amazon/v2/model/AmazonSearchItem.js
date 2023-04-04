export class AmazonSearchItem {
    constructor(searchResultElement) {
        // Basic attributes
        // ID
        this.asin = searchResultElement.getAttribute("data-asin")
        // POSITION
        this.position = parseInt(searchResultElement.getAttribute("data-index"))

        // NAME
        try {
            const nameEl = searchResultElement.querySelector("h2")
            this.name = nameEl.textContent.trim()
        } catch (error) {
            // cl("Item name could not be found")
        }

        // AVG RATING & NUMBER OF REVIEWS
        try {
            const ratingEl = searchResultElement.getElementsByClassName("a-section a-spacing-none a-spacing-top-micro")[0]
            this.avgRating = parseFloat(ratingEl.getElementsByClassName("a-size-base")[0].textContent.replace(/[{()},.]/g, ''))
            this.nReviews = parseFloat(ratingEl.getElementsByClassName("a-size-base s-underline-text")[0].textContent.replace(/[{()},.]/g, ''))
        } catch (error) {
            // cl("No rating element found")
        }

        // PRICE
        try {
            const priceEl = searchResultElement.querySelector("span.a-price > span.a-offscreen")
            const priceValue = parseFloat(priceEl.textContent.replace(/\D/g, ''))
            this.price = priceValue
        } catch (error) {
            // cl("No price element found")
        }

        // DELIVERY TIME
        try {
            const dlvTimeString = searchResultElement.querySelector("div.a-row.a-size-base.a-color-secondary.s-align-children-center")
            this.deliveryInfo = dlvTimeString.textContent.trim()
        } catch (error) {
            // cl("No delivery info present")
        }
    }
}