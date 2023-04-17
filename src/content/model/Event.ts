import { AmazonSearchItem } from "./AmazonSearchItem";

export class Event {
    item: AmazonSearchItem;
    timestamp: string;
    type: string;

    constructor(item: AmazonSearchItem, type: string) {
        this.item = item;
        this.timestamp = new Date().toJSON();
        this.type = type;
    }
}