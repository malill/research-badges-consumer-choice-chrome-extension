import { Device } from "./Device";
import { Page } from "./Page";
import { User } from "./User";

export class ProductNavigatorData {
    constructor() {
        this.device = new Device();
        this.events = [];
        this.page = new Page();
        this.user = new User();
    }
}