export class AmazonSearchItem {
    constructor(asin, position, name, price, avgRating, nReviews, defaultBadge1, ecmBadge1) {
        this.asin = asin
        this.position = position
        this.name = name
        this.price = price
        this.avgRating = avgRating
        this.nReviews = nReviews
        this.badge1Ecm = ecmBadge1
        this.badge1Platform = defaultBadge1
    }
}