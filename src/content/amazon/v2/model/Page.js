export class Page {
    constructor() {
        this.hostname = window.location.hostname;
        this.tabTitle = document.title;
        this.queryString = window.location.search;
    }
}