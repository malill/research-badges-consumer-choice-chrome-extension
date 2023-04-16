export class TaskEvent {
    constructor(pnData, event) {
        try {
            if (event.item) {
                // Item attributes
                const item = event.item;
                this.asin = item.asin;
                this.avg_rating = item.avgRating;
                this.delivery_info = item.deliveryInfo;
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
            this.is_battery_charging = pnData.device.batteryCharging;
            this.battery_charging_time = pnData.device.batteryChargingTime;
            this.battery_discharging_time = pnData.device.batteryDischargingTime;
            this.battery_level = pnData.device.batteryLevel;

            this.network_downlink = pnData.device.networkDownlink;
            this.networt_effective_type = pnData.device.networkEffectiveType;
            this.user_agent = pnData.device.userAgent;

            this.window_inner_height = pnData.device.windowInnerHeight;
            this.window_inner_width = pnData.device.windowInnerWidth;
            this.window_outer_height = pnData.device.windowOuterHeight;
            this.window_outer_width = pnData.device.windowOuterWidth;

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