export class Page {
    hostname: string;
    tabTitle: string;
    url: string;
    queryString: string;

    constructor() {
        this.hostname = window.location.hostname;
        this.tabTitle = document.title;
        this.url = window.location.href;
        this.queryString = window.location.search;
    }
}