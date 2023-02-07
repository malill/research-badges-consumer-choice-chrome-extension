// This script gets injected into any opened page whose URL matches the pattern defined in the manifest
// (see "content_script" key). Several foreground scripts can be declared
// and injected into the same or different pages.

import { cl } from "./util";

// Do other stuff
cl("Hello, I am a Bot!");
const url = window.location.href
cl(`You are visiting: ${url}`)
