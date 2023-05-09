import { Event } from "./Event";
import { ProductNavigatorData } from "./ProductNavigatorData";

export class TaskEvent {
    // A task event is a flat representation of a ProductNavigatorData object and a single event
    asin: string;
    avg_rating: number;
    delivery_info: string;
    out_of_stock: string;
    n_ratings: number;
    name: string;
    position: number;
    price: number;
    img_url: string;
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
    network_effective_type: any;
    network_rtt: any;
    network_save_data: any;
    user_agent: string;
    platform: string;
    language: string;
    processors: number;
    memory: number;
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
                this.avg_rating = item.avg_rating;
                this.delivery_info = item.delivery_info;
                this.n_ratings = item.n_ratings;
                this.name = item.name;
                this.position = item.position;
                this.price = item.price;
                this.img_url = item.img_url;
                Object.assign(this, item["badges"])
            }
            // Event attributes
            this.event_type = event.event_type;
            this.timestamp_client = event.timestamp_client;

            // User attributes (note: geo data might be undefined bc promise)
            this.geo_accuracy = pnData.user.geo_accuracy;
            this.geo_latitude = pnData.user.geo_latitude;
            this.geo_longitude = pnData.user.geo_longitude;
            this.user_uid = pnData.user.user_uid;
            this.user_task_uid = pnData.user.user_task_uid;
            this.user_task_id = pnData.user.user_task_id;

            // Device attributes
            this.battery_charging = pnData.device.battery_charging;
            this.battery_charging_time = pnData.device.battery_charging_time;
            this.battery_discharging_time = pnData.device.battery_discharging_time;
            this.battery_level = pnData.device.battery_level;

            this.network_downlink = pnData.device.network_downlink;
            this.network_effective_type = pnData.device.network_effective_type;
            this.network_rtt = pnData.device.network_rtt;
            this.network_save_data = pnData.device.network_save_data;
            this.user_agent = pnData.device.user_agent;
            this.platform = pnData.device.platform;
            this.language = pnData.device.language;
            this.processors = pnData.device.processors;
            this.memory = pnData.device.memory;
            this.referrer = pnData.device.referrer;

            this.window_inner_height = pnData.device.window_inner_height;
            this.window_inner_width = pnData.device.window_inner_width;
            this.window_outer_height = pnData.device.window_outer_height;
            this.window_outer_width = pnData.device.window_outer_width;

            this.screen_color_depth = pnData.device.screen_color_depth;
            this.screen_pixel_depth = pnData.device.screen_pixel_depth;

            // Page attributes
            this.hostname = pnData.page.hostname;
            this.tab_title = pnData.page.tab_title;
            this.query_string = pnData.page.query_string;
            this.url = pnData.page.url;
        } catch {
            console.log("An error occured creating TaskEvent object.")
        }
    }
}