import { AmazonItem } from "./AmazonItem";

export class Event {
    item: AmazonItem;
    timestamp: string;
    type: string;

    constructor(item: AmazonItem, type: string) {
        this.item = item;
        this.timestamp = new Date().toJSON();
        this.type = type;
    }
}