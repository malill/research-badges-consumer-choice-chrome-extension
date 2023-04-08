import { REST_API_URL } from "../../../../config/constants";
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
        console.log(this);
        this.send(e);
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
                let event = new AmazonEvent(item, "view");
                this.pushEvent(event);
            }
        });
    }

    attachViewListener(el) {
        $(window).on("resize scroll", () => {
            if (isInViewport(el) && (!el.isViewed)) {
                el.isViewed = true; // prevents entering this clause multiple times
                let item = new AmazonSearchItem(el);
                let event = new AmazonEvent(item, "view");
                this.pushEvent(event);
            }
        });
    }

    send(e) {
        // Send ProductNavigatorData to backend
        $.ajax({
            url: REST_API_URL,
            headers: {
            },
            type: "POST",
            data: JSON.stringify({ 'productNavigatorData': this, 'new_event': e }),
            contentType: "application/json",
            dataType: "json"
        });
    }
}