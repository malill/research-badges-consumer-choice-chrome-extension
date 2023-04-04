// This file can be imported inside the service worker,
// which means all of its functions and variables will be accessible
// inside the service worker.
// The importation is done in the file `service-worker.js`.

import { CORE_SHORT_NAME } from "../config/constants"

console.log(`[${CORE_SHORT_NAME}] External file is also loaded!`)
