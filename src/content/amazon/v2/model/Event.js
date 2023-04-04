export class Event {
    constructor() {
        this.item = null;
        this.timestamp = new Date().toJSON();
        this.type = "view";
    }
}