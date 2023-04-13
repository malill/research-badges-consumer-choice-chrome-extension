import { COOKIE_LIFETIME_1MONTH, PRL_COOKIE_NAME_GROUP, PRL_COOKIE_NAME_ID, PRL_TREATMENT_GROUP } from "../../config/constants";
import { getCookie, setCookie } from "../util/cookie";

export class User {

    static cookieLifetimeHours = 24 * 7 * 4;

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
        const idQueryValue = urlParams.get(PRL_COOKIE_NAME_ID);
        const groupQueryValue = urlParams.get(PRL_COOKIE_NAME_GROUP);

        // Cookie params
        const idCookieValue = getCookie(PRL_COOKIE_NAME_ID);
        const groupCookieValue = getCookie(PRL_COOKIE_NAME_GROUP);

        id = this.checkQueryCookieValues(idQueryValue, idCookieValue, PRL_COOKIE_NAME_ID)
        group = this.checkQueryCookieValues(groupQueryValue, groupCookieValue, PRL_COOKIE_NAME_GROUP);

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
            res = setCookie(cookieName, queryValue, COOKIE_LIFETIME_1MONTH); // means also existing values are overwritten
        } else {
            // Value not in query
            if (cookieValue) {
                // Value in cookie
                res = cookieValue;
            } else {
                // Value neither in query nor in cookie 
                if (cookieName == PRL_COOKIE_NAME_ID) {
                    // -> generate new ID
                    res = setCookie(cookieName, this.generateNewUserID(), COOKIE_LIFETIME_1MONTH);
                } else {
                    // -> assign treatment
                    res = setCookie(cookieName, PRL_TREATMENT_GROUP, COOKIE_LIFETIME_1MONTH);
                }
            }
        }
        return res;
    }

    generateNewUserID = () => {
        const dateString = Date.now().toString(36);
        const randomness = Math.random().toString(36).substr(2);
        return dateString + randomness;
    };

}