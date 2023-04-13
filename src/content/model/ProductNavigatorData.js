import { REST_API_URL } from "../../config/constants";
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
        let prolificEvent = {}
        try {
            if (e.item) {
                // Item attributes
                const item = e.item;
                prolificEvent["asin"] = item.asin;
                prolificEvent["avg_rating"] = item.avgRating;
                prolificEvent["delivery_info"] = item.deliveryInfo;
                prolificEvent["n_ratings"] = item.nReviews;
                prolificEvent["name"] = item.name;
                prolificEvent["position"] = item.position;
                prolificEvent["price"] = item.price;
                prolificEvent = Object.assign(prolificEvent, item["badges"])
            }
            // Event attributes
            prolificEvent["event_type"] = e.type;
            prolificEvent["timestamp_client"] = e.timestamp;

            // User attributes (note: geo data might be undefined bc promise)
            prolificEvent["geo_accuracy"] = this.user.geoAccuracy;
            prolificEvent["geo_latitude"] = this.user.geoLatitude;
            prolificEvent["geo_longitude"] = this.user.geoLongitude;
            prolificEvent["user_group"] = this.user.group;
            prolificEvent["user_id"] = this.user.id;

            // Device attributes
            prolificEvent["is_battery_charging"] = this.device.batteryCharging;
            prolificEvent["battery_charging_time"] = this.device.batteryChargingTime;
            prolificEvent["battery_discharging_time"] = this.device.batteryDischargingTime;
            prolificEvent["battery_level"] = this.device.batteryLevel;

            prolificEvent["network_downlink"] = this.device.networkDownlink;
            prolificEvent["networt_effective_type"] = this.device.networkEffectiveType;
            prolificEvent["user_agent"] = this.device.userAgent;

            prolificEvent["window_inner_height"] = this.device.windowInnerHeight;
            prolificEvent["window_inner_width"] = this.device.windowInnerWidth;
            prolificEvent["window_outer_height"] = this.device.windowOuterHeight;
            prolificEvent["window_outer_width"] = this.device.windowOuterWidth;

            // Page attributes
            prolificEvent["hostname"] = this.page.hostname;
            prolificEvent["tab_title"] = this.page.tabTitle;
            prolificEvent["query_string"] = this.page.queryString;
            prolificEvent["url"] = this.page.url;
        } catch {
            console.log("An error occured sending event.")
        }
        this.send(prolificEvent);
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