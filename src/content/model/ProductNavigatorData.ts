import { isInViewport } from "../util/isInViewport";
import { Event } from "./Event";
import { AmazonItem } from "./AmazonItem";
import { Device } from "./Device";
import { Page } from "./Page";
import { User } from "./User";
import { TaskEvent } from "./TaskEvent";

export class ProductNavigatorData {
    log_level: string;
    device: Device;
    events: Event[];
    page: Page;
    user: User;

    constructor() {
        this.log_level = process.env.LOG_LEVEL;
        this.device = new Device();
        this.events = [];
        this.page = new Page();
        this.user = new User();

        // Push event when the page is loaded
        this.pushEvent(new Event(null, "page-load"));
        // Push event when the page is visible
        this.pushEventWhenVisible(new Event(null, "page-visit"));

        this.addSendAnalyticsListener();
    }

    pushEvent(event: Event) {
        this.events.push(event);
        if (this.log_level === "debug") {
            console.log(event);
        }
    }
    pushEventWhenVisible(event: Event) {
        /* Pushes the event when the page is visible and updates the timestamp. */
        // Check if the page is currently visible or not
        if (!document.hidden) {
            event.timestamp_client = new Date().toJSON();
            this.pushEvent(event);
        }
        // Listen to changes in the visibility of the page, i.e. it was not visible and now it is
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                event.timestamp_client = new Date().toJSON();
                this.pushEvent(event);
            }
        });
    }

    eventHandlerSearchResults(searchResults: any[] | NodeListOf<Element>) {
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

            // Attach right-click listeners to all search elements
            searchResultElement.addEventListener("contextmenu", (e: any) => {
                this.pushEvent(new Event(item, "right-click"));
            });

        });
    }

    eventHandlerProductDetailPage(document: Document) {
        let pdpDetails = {};

        // Amazon's Choice Badge
        try {
            let acBadgeCategory = document.querySelector("#acBadge_feature_div > div > span.ac-for-text > span > span.ac-keyword-link").textContent;
            pdpDetails["acCategory"] = acBadgeCategory;
        } catch (error) { }


        // Buy Box Information
        let buyBoxSimpleSelector = (selectorName: string) => document.querySelectorAll(`#tabular-buybox > div.tabular-buybox-container > div.tabular-buybox-text[tabular-attribute-name='${selectorName}']`)[0];
        let buyBoxExpandableSelector = (selectorName: string) => document.querySelectorAll(`#tabular-buybox > div > div.a-expander-content.a-expander-partial-collapse-content > div.tabular-buybox-container > div.tabular-buybox-text[tabular-attribute-name='${selectorName}']`)[0];

        const selectorNames = ["Payment", "Dispatches from", "Sold by", "Returns"];
        const selectorNamesTaskKeys = ["payment", "dispatcher", "seller", "return_policy"];

        selectorNames.forEach((sName: string, index: number) => {
            try {
                pdpDetails[selectorNamesTaskKeys[index]] = (buyBoxSimpleSelector(sName) ? buyBoxSimpleSelector(sName) : buyBoxExpandableSelector(sName));
                pdpDetails[selectorNamesTaskKeys[index]] = pdpDetails[selectorNamesTaskKeys[index]].textContent.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
            } catch (error) { }
        });

        // Stock Level
        try {
            pdpDetails["stock_level"] = document.querySelector("#availability").textContent.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
        } catch (error) { }

        let asin = null;
        try {
            asin = document.getElementById("addToCart_feature_div").getAttribute("data-csa-c-asin");
        } catch (error) { }

        let item = new AmazonItem(null, asin);
        item.pdpDetails = pdpDetails;
        item.name = document.getElementById("productTitle").textContent.trim();
        let event = new Event(item, "inspect");
        this.pushEventWhenVisible(event);
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

    isUserFromStudy() {
        return (this.user.user_task_id) && (this.user.user_task_id != process.env.COOKIE_VALUE_MISSING);
    }

    resetEvents() {
        this.events = [];
    }

    addSendAnalyticsListener() {
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden") {
                let taskEvents = [];
                this.events.forEach((event) => {
                    taskEvents.push(new TaskEvent(this, event));
                });
                if (this.log_level === "debug") {
                    console.log(taskEvents);
                }
                navigator.sendBeacon(
                    process.env.REST_API_URL,
                    new Blob([JSON.stringify(taskEvents)], { type: "application/json" })
                );
                this.resetEvents();
            }
        });
    }
}