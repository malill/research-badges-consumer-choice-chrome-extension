import { COOKIE_LIFETIME_1MONTH, COOKIE_LIFETIME_1YEAR, COOKIE_NAME_TASK_ID, COOKIE_NAME_TASK_USER_ID, COOKIE_NAME_USER_ID } from "../../config/constants";
import { getCookie, setCookie } from "../util/cookie";

export class User {

    static cookieLifetimeHours = 24 * 7 * 4;

    constructor() {
        this.setUID();
        this.setLocation();
        this.setTaskDetails();
    }

    setUID() {
        // Gets user ID from cookie or sets cookie if not present
        this.uid = getCookie(COOKIE_NAME_USER_ID);
        if (this.uid != "") {
            return;
        } else {
            this.uid = setCookie(COOKIE_NAME_USER_ID, this.generateNewUserID(), COOKIE_LIFETIME_1YEAR);
        }
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

    setTaskDetails() {
        // Info for task ID and task user ID are stored in 
        // (1) searchQuery OR (2) cookie OR (3) both

        // Query parameter values
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const queryValueTaskUserID = urlParams.get(COOKIE_NAME_TASK_USER_ID);
        const queryValueTaskID = urlParams.get(COOKIE_NAME_TASK_ID);

        // Cookie values 
        const cookieValueTaskUserID = getCookie(COOKIE_NAME_TASK_USER_ID);
        const cookieValueTaskID = getCookie(COOKIE_NAME_TASK_ID);

        // Compare query and cookie values
        this.taskUID = this.checkQueryCookieValues(queryValueTaskUserID, cookieValueTaskUserID, COOKIE_NAME_TASK_USER_ID);
        this.taskID = this.checkQueryCookieValues(queryValueTaskID, cookieValueTaskID, COOKIE_NAME_TASK_ID);;
    }

    checkQueryCookieValues(queryValue, cookieValue, cookieName) {
        // Compares two values, and updates cookie if necessary
        let res = null;

        if ((!queryValue) && (!cookieValue)) {
            // Neither a query nor a cookie value is present --> non-task user
            return null;
        }

        if ((queryValue) && (cookieValue) && (queryValue != cookieValue)) {
            // Value in query and in cookie, but values are different
            // What to do? Here: belief query value (next clause)
        }

        if (queryValue) {
            // Value in query
            res = setCookie(cookieName, queryValue, COOKIE_LIFETIME_1MONTH); // means also existing values are overwritten
        } else {
            // Value not in query
            if (cookieValue) {
                // Value in cookie
                res = cookieValue;
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