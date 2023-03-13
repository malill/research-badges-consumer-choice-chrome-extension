export class User {
    constructor(userInfo) {
        this.id = userInfo.userId
        this.group = userInfo.userGroup
        this.environment = userInfo.environment
        this.login = 0 // TODO: where fetch this info (cookie?)
        this.userAgent = window.navigator.userAgent
        this.userAgentData = window.navigator.userAgentData
        this.window_inner_width = window.innerWidth
        this.window_inner_height = window.innerHeight
        this.window_outer_width = window.outerWidth
        this.window_outer_height = window.outerHeight
        this.connection = window.navigator.connection
        this.getLocation()
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => this.geolocation = pos);
        } else {
            console.log("Geolocation is not supported by this browser");
        }
    }

    async getBattery() {
        await window.navigator.getBattery().then(battery => this.battery = battery)
    }

}