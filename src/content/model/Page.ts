export class Page {
    hostname: string;
    tab_title: string;
    url: string;
    query_string: string;

    constructor() {
        this.hostname = window.location.hostname;
        this.tab_title = document.title;
        this.url = window.location.href;
        this.query_string = window.location.search;
    }
}