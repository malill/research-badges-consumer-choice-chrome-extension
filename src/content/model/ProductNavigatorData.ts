import { REST_API_URL } from "../../config/settings";
import { isInViewport } from "../util/isInViewport";
import { Event } from "./Event";
import { AmazonSearchItem } from "./AmazonSearchItem";
import { Device } from "./Device";
import { Page } from "./Page";
import { User } from "./User";
import { TaskEvent } from "./TaskEvent";

export class ProductNavigatorData {
    device: Device;
    events: any[];
    page: Page;
    user: User;

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
        let taskEvent = new TaskEvent(this, e);
        console.log(this);
        console.log(taskEvent);
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

    attachViewListener(htmlElement: any) {
        $(window).on("resize scroll", () => {
            if (isInViewport(htmlElement) && (!htmlElement.isViewed)) {
                htmlElement.isViewed = true; // prevents entering this clause multiple times
                let item = new AmazonSearchItem(htmlElement);
                let event = new Event(item, "view");
                this.pushEvent(event);
            }
        });
    }

    send(taskEvent: TaskEvent) {
        $.ajax({
            url: REST_API_URL,
            headers: {
            },
            type: "POST",
            data: JSON.stringify(taskEvent),
            contentType: "application/json",
            dataType: "json"
        });
    }
}