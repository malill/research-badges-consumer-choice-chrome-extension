import { isInViewport } from "../util/isInViewport";
import { Event } from "./Event";
import { AmazonItem } from "./AmazonItem";
import { Device } from "./Device";
import { Page } from "./Page";
import { User } from "./User";
import { TaskEvent } from "./TaskEvent";
import { debug } from "../util/debug";

export class ProductNavigatorData {
    log_level: string;
    device: Device;
    events: any[];
    page: Page;
    user: User;

    constructor() {
        this.log_level = process.env.LOG_LEVEL;
        this.device = new Device();
        this.events = [];
        this.page = new Page();
        this.user = new User();

        // If page is a product detail page, attach item to event
        let item = null;
        try {
            const asin = document.getElementById("addToCart_feature_div").getAttribute("data-csa-c-asin");
            item = new AmazonItem(null, asin);
        } catch (error) { }

        // Push the page-load event
        this.pushEvent(new Event(item, "page-load"));

        // Page visibility handler
        this.pageVisibilityHandler(item);
    }

    pushEvent(event: Event) {
        this.events.push(event);
        // Whenever a new event is pushed to the datalayer, also send it to backend
        let taskEvent = new TaskEvent(this, event);
        debug(
            () => { console.log(taskEvent) },
            () => { this.send(taskEvent) },
            this.log_level
        );
    }

    pageVisibilityHandler(item: AmazonItem) {
        // Check if the page is currently visible or not
        if (!document.hidden) {
            this.pushEvent(new Event(item, "page-visit"));
        }
        // Listen to changes in the visibility of the page, i.e. it was not visible and now it is
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.pushEvent(new Event(item, "page-visit"));
            }
        });
    }

    attachEventsfromSearchResults(searchResults: any[] | NodeListOf<Element>) {
        searchResults.forEach((searchResultElement) => {

            if (!isInViewport(searchResultElement)) {
                // Element is not viewed -> register a "view-listener"
                searchResultElement.isViewed = false;
                this.attachViewListener(searchResultElement);
            } else {
                // Element is in viewport -> directly push view event
                let item = new AmazonItem(searchResultElement);
                this.pushEvent(new Event(item, "view"));
            }

            // Attach click listeners to all search elements
            let item = new AmazonItem(searchResultElement);
            searchResultElement.addEventListener("click", () => {
                this.pushEvent(new Event(item, "click"));
            });
            searchResultElement.addEventListener("contextmenu", (e: any) => {
                this.pushEvent(new Event(item, "right-click"));
            });

        });
    }

    attachViewListener(htmlElement: any) {
        $(window).on("resize scroll", () => {
            if (isInViewport(htmlElement) && (!htmlElement.isViewed)) {
                htmlElement.isViewed = true; // prevents entering this clause multiple times
                let item = new AmazonItem(htmlElement);
                let event = new Event(item, "view");
                this.pushEvent(event);
            }
        });
    }

    send(taskEvent: TaskEvent) {
        $.ajax({
            url: process.env.REST_API_URL,
            headers: {
            },
            type: "POST",
            data: JSON.stringify(taskEvent),
            contentType: "application/json",
            dataType: "json"
        });
    }

    isUserFromStudy() {
        return (this.user.taskID) && (this.user.taskID != process.env.COOKIE_VALUE_MISSING);
    }
}