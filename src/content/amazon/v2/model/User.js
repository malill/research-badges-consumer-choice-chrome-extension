export class User {
    constructor() {
        this.id = null;
        this.group = null;
        this.login = null; // TODO: where fetch this info (cookie?)
        this.getLocation();
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const geoCoords = pos.coords;
                this.geoLatitude = geoCoords.latitude;
                this.geoLongitude = geoCoords.longitude;
                this.geoAccuracy = geoCoords.accuracy;
            });
        } else {
            console.log("Geolocation is not supported by this browser");
        }
    }

}