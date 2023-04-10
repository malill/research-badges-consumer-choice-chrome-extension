import { REST_API_URL } from "../../../../config/constants";
import { isInViewport } from "../util/isInViewport";
import { Event } from "./Event";
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
        let e = new Event(null, "page-view");
        this.pushEvent(e);
    }

    pushEvent(e) {
        // Checks needed?
        this.events.push(e);
        // Whenever a new event is pushed to the datalayer, also send it to backend
        // this.send(e);
    }

    attachEventsfromSearchResults(searchResults) {
        searchResults.forEach((searchResultElement) => {
            if (!isInViewport(searchResultElement)) {
                // Element is not viewed -> register a "view-listener"
                searchResultElement.isViewed = false;
                this.attachViewListener(searchResultElement);
                return;
            } else {
                // Element is in viewport -> directly push view event
                let item = new AmazonSearchItem(searchResultElement);
                let event = new Event(item, "view");
                this.pushEvent(event);
            }
        });
    }

    attachViewListener(el) {
        $(window).on("resize scroll", () => {
            if (isInViewport(el) && (!el.isViewed)) {
                el.isViewed = true; // prevents entering this clause multiple times
                let item = new AmazonSearchItem(el);
                let event = new Event(item, "view");
                this.pushEvent(event);
            }
        });
    }

    send(e) {
        $.ajax({
            url: REST_API_URL,
            headers: {
            },
            type: "POST",
            // Send datalayer, note: event e == this.events[-1]
            data: JSON.stringify({ 'productNavigatorData': this, 'event': e }),
            contentType: "application/json",
            dataType: "json"
        });
    }
}