import { AmazonItem } from "./AmazonItem";

export class Event {
    items: [AmazonItem];
    event_type: string;
    timestamp_client: string;

    constructor(items: [AmazonItem], type: string) {
        this.timestamp_client = new Date().toJSON();
        this.items = items;
        this.event_type = type;
    }
}