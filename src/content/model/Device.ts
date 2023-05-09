export class Device {
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

    window_inner_width: number;
    window_inner_height: number;
    window_outer_width: number;
    window_outer_height: number;
    screen_color_depth: number;
    screen_pixel_depth: number;

    constructor() {
        this.setNetworkInformation();
        this.setBattery();
        this.user_agent = window.navigator.userAgent;
        //@ts-ignore
        this.platform = window.navigator.userAgentData.platform;
        this.language = window.navigator.language;
        this.processors = window.navigator.hardwareConcurrency;
        //@ts-ignore
        this.memory = window.navigator.deviceMemory;
        this.referrer = document.referrer;

        this.window_inner_width = window.innerWidth;
        this.window_inner_height = window.innerHeight;
        this.window_outer_width = window.outerWidth;
        this.window_outer_height = window.outerHeight;

        this.screen_color_depth = window.screen.colorDepth;
        this.screen_pixel_depth = window.screen.pixelDepth;
    }

    setNetworkInformation() {
        //@ts-ignore
        this.network_downlink = window.navigator.connection.downlink;
        //@ts-ignore
        this.network_effective_type = window.navigator.connection.effectiveType;
        //@ts-ignore
        this.network_rtt = window.navigator.connection.rtt;
        //@ts-ignore
        this.network_save_data = window.navigator.connection.saveData;
    }

    async setBattery() {
        //@ts-ignore
        const battery = await window.navigator.getBattery();
        this.battery_charging = battery.charging;
        this.battery_charging_time = battery.chargingTime;
        this.battery_discharging_time = battery.dischargingTime;
        this.battery_level = battery.level;
    }
}