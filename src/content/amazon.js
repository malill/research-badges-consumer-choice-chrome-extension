import { CORE_SHORT_NAME, AMA_CSS_BAGE_CLASS, REST_API_URL } from "../config/constants"

var $ = require("jquery");

var badgeClasses = $(`.${AMA_CSS_BAGE_CLASS}`)

console.log(`[${CORE_SHORT_NAME}] Removed badges from ${badgeClasses.length} products`)

$.get(REST_API_URL + "info", (res) => {
    console.log(res);
})