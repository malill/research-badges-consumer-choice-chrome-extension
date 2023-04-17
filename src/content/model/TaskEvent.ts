import { Event } from "./Event";
import { ProductNavigatorData } from "./ProductNavigatorData";

export class TaskEvent {
    // A task event is a flat representation of a ProductNavigatorData object
    asin: string;
    avg_rating: number;
    delivery_info: string;
    out_of_stock: string;
    n_ratings: number;
    name: string;
    position: number;
    price: number;
    event_type: string;
    timestamp_client: string;
    geo_accuracy: number;
    geo_latitude: number;
    geo_longitude: number;
    user_uid: string;
    user_task_uid: string;
    user_task_id: string;
    battery_charging: any;
    battery_charging_time: any;
    battery_discharging_time: any;
    battery_level: any;
    network_downlink: any;
    networt_effective_type: any;
    networt_rtt: any;
    networt_save_data: any;
    user_agent: string;
    platform: string;
    language: string;
    processors: number;
    referrer: string;
    window_inner_height: number;
    window_inner_width: number;
    window_outer_height: number;
    window_outer_width: number;
    screen_color_depth: number;
    screen_pixel_depth: number;
    hostname: string;
    tab_title: string;
    query_string: string;
    url: string;


    constructor(pnData: ProductNavigatorData, event: Event) {
        try {
            if (event.item) {
                // Item attributes
                const item = event.item;
                this.asin = item.asin;
                this.avg_rating = item.avgRating;
                this.delivery_info = item.deliveryInfo;
                this.out_of_stock = item.outOfStockTxt;
                this.n_ratings = item.nReviews;
                this.name = item.name;
                this.position = item.position;
                this.price = item.price;
                Object.assign(this, item["badges"])
            }
            // Event attributes
            this.event_type = event.type;
            this.timestamp_client = event.timestamp;

            // User attributes (note: geo data might be undefined bc promise)
            this.geo_accuracy = pnData.user.geoAccuracy;
            this.geo_latitude = pnData.user.geoLatitude;
            this.geo_longitude = pnData.user.geoLongitude;
            this.user_uid = pnData.user.uid;
            this.user_task_uid = pnData.user.taskUID;
            this.user_task_id = pnData.user.taskID;

            // Device attributes
            this.battery_charging = pnData.device.batteryCharging;
            this.battery_charging_time = pnData.device.batteryChargingTime;
            this.battery_discharging_time = pnData.device.batteryDischargingTime;
            this.battery_level = pnData.device.batteryLevel;

            this.network_downlink = pnData.device.networkDownlink;
            this.networt_effective_type = pnData.device.networkEffectiveType;
            this.networt_rtt = pnData.device.networkRtt;
            this.networt_save_data = pnData.device.networkSaveData;
            this.user_agent = pnData.device.userAgent;
            this.platform = pnData.device.platform;
            this.language = pnData.device.language;
            this.processors = pnData.device.processors;
            this.referrer = pnData.device.referrer;

            this.window_inner_height = pnData.device.windowInnerHeight;
            this.window_inner_width = pnData.device.windowInnerWidth;
            this.window_outer_height = pnData.device.windowOuterHeight;
            this.window_outer_width = pnData.device.windowOuterWidth;

            this.screen_color_depth = pnData.device.screenColorDepth;
            this.screen_pixel_depth = pnData.device.screenPixelDepth;

            // Page attributes
            this.hostname = pnData.page.hostname;
            this.tab_title = pnData.page.tabTitle;
            this.query_string = pnData.page.queryString;
            this.url = pnData.page.url;
        } catch {
            console.log("An error occured creating TaskEvent object.")
        }
    }
}