export class Device {
    constructor() {
        this.setNetworkInformation();
        this.setBattery();
        this.userAgent = window.navigator.userAgent;
        this.window_inner_width = window.innerWidth;
        this.window_inner_height = window.innerHeight;
        this.window_outer_width = window.outerWidth;
        this.window_outer_height = window.outerHeight;
    }

    setNetworkInformation() {
        const conn = window.navigator.connection;
        this.networkDownlink = conn.downlink;
        this.networkEffectiveType = conn.effectiveType;
    }

    async setBattery() {
        await window.navigator.getBattery().then(battery => {
            this.batteryCharging = battery.charging;
            this.batteryChargingTime = battery.chargingTime;
            this.batteryDischargingTime = battery.dischargingTime;
            this.batteryLevel = battery.level;
        })
    }
}