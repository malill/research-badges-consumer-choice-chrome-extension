import { REST_API_URL } from "../../config/settings";
import { isInViewport } from "../util/isInViewport";
import { Event } from "./Event";
import { AmazonSearchItem } from "./AmazonSearchItem";
import { Device } from "./Device";
import { Page } from "./Page";
import { User } from "./User";
import { TaskEvent } from "./TaskEvent";

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
        let taskEventObject = new TaskEvent(this, e);

        console.log(taskEventObject);
        // this.send(taskEvent);
    }

    attachEventsfromSearchResults(searchResults) {
        searchResults.forEach((searchResultElement) => {
            if (!isInViewport(searchResultElement)) {
                // Element is not viewed -> register a "view-listener"
                searchResultElement.isViewed = false;
                this.attachViewListener(searchResultElement);
            } else {
                // Element is in viewport -> directly push view event
                let item = new AmazonSearchItem(searchResultElement);
                let event = new Event(item, "view");
                this.pushEvent(event);
            }
            // Attach click listener to all search elements
            searchResultElement.addEventListener("click", () => {
                let item = new AmazonSearchItem(searchResultElement);
                let event = new Event(item, "click");
                this.pushEvent(event);
            });
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
            // data: JSON.stringify({ 'productNavigatorData': this, 'event': e }),
            data: JSON.stringify(e),
            contentType: "application/json",
            dataType: "json"
        });
    }
}