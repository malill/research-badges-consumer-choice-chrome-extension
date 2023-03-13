export class Platform {
    constructor() {
        this.hostname = window.location.hostname
        this.tabTitle = document.title
    }
}