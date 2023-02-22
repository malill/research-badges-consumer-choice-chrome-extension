// Core Constants
export const CORE_SHORT_NAME = "ECM-BOT"

// ECM BOT REST API
// export const REST_API_URL = "https://ecm-pai.herokuapp.com/api/v1"
export const REST_API_URL = "http://localhost:8000/api/v1/"
// Routes
export const REST_API_EVENTS_URL = REST_API_URL + "event/"

// ECM BADGES
export const ECM_BADGE_TYPE_PRIME_ICON = "prime-icon"
export const ECM_BADGE_TYPE_REMOVED_PLATFORM = "blank"
export const ECM_BADGE_TYPE_SPONSORED = "sponsored"

/* AMAZON */
// Platform Constants | Amazon Basics
export const AMA_URL = 'https://www.amazon'

// Platform Constants | Amazon Locations
export const AMA_LOCATION_DICT = {
    "SEARCH_GRID": 1,
    "SEARCH_LIST": 2,
    "PDP": 3
}

// Platform Constants | Amazon Types
export const AMA_EVENT_TYPES_DICT = {
    "VISIT": 1,
    "VIEW": 2,
    "CLICK": 3,
    "INSPECT": 4,
    "ADD_TO_CART": 5
}