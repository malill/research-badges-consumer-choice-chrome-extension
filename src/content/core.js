// This script gets injected into any opened page whose URL matches the pattern defined in the manifest
// (see "content_script" key). Several foreground scripts can be declared
// and injected into the same or different pages.

import { CORE_SHORT_NAME, REST_API_URL } from "../config/constants"

var $ = require("jquery");

// Do other stuff
console.log(`[${CORE_SHORT_NAME}] Hello, I am a Bot!!!!`);
const url = window.location.href
console.log(`[${CORE_SHORT_NAME}]`, "You are visiting:", url)

const data = {
    user_id: 1,
    type: 1,
    url: url
}

const ecm_API = REST_API_URL + "event/"

$.ajax({
    url: ecm_API,
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: "json"
});
