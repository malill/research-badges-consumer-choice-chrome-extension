export class Page {
    constructor() {
        this.hostname = window.location.hostname;
        this.tabTitle = document.title;
        this.searchQuery = window.location.search;
    }
}