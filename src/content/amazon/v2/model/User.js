import { PRL_COOKIE_NAME_GROUP, PRL_COOKIE_NAME_ID, PRL_MISSING_VALUE } from "../../../../config/constants";
import { getCookie, setCookie } from "../util/cookie";

export class User {

    static prolificID = PRL_COOKIE_NAME_ID;
    static prolificGroup = PRL_COOKIE_NAME_GROUP;
    static cookieLifetimeHours = 1;

    constructor() {
        this.setLocation();
        [this.id, this.group] = this.setProlificDetails();
    }

    setLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const geoCoords = pos.coords;
                this.geoAccuracy = geoCoords.accuracy;
                this.geoLatitude = geoCoords.latitude;
                this.geoLongitude = geoCoords.longitude;
            });
        } else {
            console.log("Geolocation is not supported by this browser");
        }
    }

    setProlificDetails() {
        // Info is stored in (1) searchQuery OR (2) cookie OR (3) both
        let id = null;
        let group = null;

        // Query params
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const idQueryValue = urlParams.get(User.prolificID);
        const groupQueryValue = urlParams.get(User.prolificGroup);

        // Cookie params
        const idCookieValue = getCookie(User.prolificID);
        const groupCookieValue = getCookie(User.prolificGroup);

        id = this.checkQueryCookieValues(idQueryValue, idCookieValue, User.prolificID)
        group = this.checkQueryCookieValues(groupQueryValue, groupCookieValue, User.prolificGroup);

        return [id, group];
    }

    checkQueryCookieValues(queryValue, cookieValue, cookieName) {
        // Compares two values, and updates cookie if necessary
        let res = null;
        if ((queryValue) && (cookieValue) && (queryValue != cookieValue)) {
            // Value in query and in cookie, but values are different
            // TODO: what to do? Here: belief query value (next clause)
        }

        if (queryValue) {
            // Value in query
            res = setCookie(cookieName, queryValue, User.cookieLifetimeHours); // means also existing values are overwritten
        } else {
            // Value not in query
            if (cookieValue) {
                // Value in cookie
                res = cookieValue;
            } else {
                // Value neither in query and nor in cookie
                res = setCookie(cookieName, PRL_MISSING_VALUE, User.cookieLifetimeHours);
            }
        }
        return res;
    }

}