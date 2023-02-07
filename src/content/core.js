// This script gets injected into any opened page whose URL matches the pattern defined in the manifest
// (see "content_script" key). Several foreground scripts can be declared
// and injected into the same or different pages.

import { CORE_SHORT_NAME } from "../config/constants"

// Do other stuff
console.log(`[${CORE_SHORT_NAME}] Hello, I am a Bot!!!!`);
const url = window.location.href
console.log(`[${CORE_SHORT_NAME}]`, "You are visiting:", url)
