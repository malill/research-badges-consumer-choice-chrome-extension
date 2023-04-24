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

    constructor(log_level: string = "info") {
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
        let e = new Event(item, "page-load");
        this.pushEvent(e);

        // Check if the page is currently visible or not
        if (document.hidden) {
            // You opened the page in a new tab
            // e = new Event(null, "page-open-in-tab");
            // this.pushEvent(e);
        } else {
            // Page was already open
            e = new Event(item, "page-visit");
            this.pushEvent(e);
        }

        // Listen to changes in the visibility of the page
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // [UNSTABLE] Sometimes this is not captured e.g. when the tab is closed
                e = new Event(item, "page-hide");
            } else {
                e = new Event(item, "page-visit");
            }
            this.pushEvent(e);
        });

        // TODO: Listen to page unload: not practical, onbeforeunload is not blockable
    }

    pushEvent(event: Event) {
        // TODO: implement check event logic
        this.events.push(event);
        // Whenever a new event is pushed to the datalayer, also send it to backend
        let taskEvent = new TaskEvent(this, event);
        debug(
            () => { console.log(taskEvent) },
            () => { this.send(taskEvent) },
            this.log_level
        );
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
                let event = new Event(item, "view");
                this.pushEvent(event);
            }

            // Attach click listeners to all search elements
            let item = new AmazonItem(searchResultElement);
            searchResultElement.addEventListener("click", () => {
                let event = new Event(item, "click");
                this.pushEvent(event);
            });
            searchResultElement.addEventListener("contextmenu", (e: any) => {
                let event = new Event(item, "right-click");
                this.pushEvent(event);
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