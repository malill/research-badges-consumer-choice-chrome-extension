export class Device {
    userAgent: string;
    platform: string;
    language: string;
    processors: number;
    referrer: string;
    windowInnerWidth: number;
    windowInnerHeight: number;
    windowOuterWidth: number;
    windowOuterHeight: number;
    screenColorDepth: number;
    screenPixelDepth: number;
    networkDownlink: any;
    networkEffectiveType: any;
    networkRtt: any;
    networkSaveData: any;
    batteryCharging: any;
    batteryChargingTime: any;
    batteryDischargingTime: any;
    batteryLevel: any;

    constructor() {
        this.setNetworkInformation();
        this.setBattery();
        this.userAgent = window.navigator.userAgent;
        //@ts-ignore
        this.platform = window.navigator.userAgentData.platform;
        this.language = window.navigator.language;
        this.processors = window.navigator.hardwareConcurrency;
        this.referrer = document.referrer;

        this.windowInnerWidth = window.innerWidth;
        this.windowInnerHeight = window.innerHeight;
        this.windowOuterWidth = window.outerWidth;
        this.windowOuterHeight = window.outerHeight;

        this.screenColorDepth = window.screen.colorDepth;
        this.screenPixelDepth = window.screen.pixelDepth;
    }

    setNetworkInformation() {
        //@ts-ignore
        this.networkDownlink = window.navigator.connection.downlink;
        //@ts-ignore
        this.networkEffectiveType = window.navigator.connection.effectiveType;
        //@ts-ignore
        this.networkRtt = window.navigator.connection.rtt;
        //@ts-ignore
        this.networkSaveData = window.navigator.connection.saveData;
    }

    async setBattery() {
        //@ts-ignore
        const battery = await window.navigator.getBattery();
        this.batteryCharging = battery.charging;
        this.batteryChargingTime = battery.chargingTime;
        this.batteryDischargingTime = battery.dischargingTime;
        this.batteryLevel = battery.level;
    }
}