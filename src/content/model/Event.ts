import { AmazonItem } from "./AmazonItem";

export class Event {
    item: AmazonItem;
    event_type: string;
    timestamp_client: string;

    constructor(item: AmazonItem, type: string) {
        this.timestamp_client = new Date().toJSON();
        this.item = item;
        this.event_type = type;
    }
}