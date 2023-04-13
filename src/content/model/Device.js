export class Device {
    constructor() {
        this.setNetworkInformation();
        this.setBattery();
        this.userAgent = window.navigator.userAgent;
        this.windowInnerWidth = window.innerWidth;
        this.windowInnerHeight = window.innerHeight;
        this.windowOuterWidth = window.outerWidth;
        this.windowOuterHeight = window.outerHeight;
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