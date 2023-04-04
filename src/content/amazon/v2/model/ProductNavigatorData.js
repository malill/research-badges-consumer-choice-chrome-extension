import { isInViewport } from "../util/isInViewport";
import { AmazonEvent } from "./AmazonEvent";
import { AmazonSearchItem } from "./AmazonSearchItem";
import { Device } from "./Device";
import { Page } from "./Page";
import { User } from "./User";

export class ProductNavigatorData {
    constructor() {
        this.device = new Device();
        this.events = [];
        this.page = new Page();
        this.user = new User();
    }

    pushEvent(e) {
        this.events.push(e);
    }

    attachEventsfromSearchResults(searchResults) {
        searchResults.forEach((searchResultElement) => {
            if (!isInViewport(searchResultElement)) {
                // TODO: set a listener to scroll into view and make ajax call (only once!)
                return
            }
            let item = new AmazonSearchItem(searchResultElement);
            let event = new AmazonEvent(item, "view");
            this.pushEvent(event);
        });
    }

    send() {
        // Send ProductNavigatorData to backend
        console.log("Sending data to backend");
        $.ajax({
            url: "http://localhost:8000/api/v1/",
            headers: {
            },
            type: "POST",
            data: JSON.stringify(this),
            contentType: "application/json",
            dataType: "json"
        });
    }
}