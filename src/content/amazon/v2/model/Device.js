export class Device {
    constructor() {
        this.userAgent = window.navigator.userAgent;
        this.window_inner_width = window.innerWidth;
        this.window_inner_height = window.innerHeight;
        this.window_outer_width = window.outerWidth;
        this.window_outer_height = window.outerHeight;
    }
}