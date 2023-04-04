export class AmazonEvent {
    constructor(type) {
        this.item = null;
        this.timestamp = new Date().toJSON();
        this.type = type;
    }
}