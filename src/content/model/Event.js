export class Event {
    constructor(item, type) {
        this.item = item;
        this.timestamp = new Date().toJSON();
        this.type = type;
    }
}