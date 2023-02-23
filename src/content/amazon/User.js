export class User {
    constructor(userInfo) {
        this.id = userInfo.userId
        this.group = userInfo.userGroup
        this.login = 0 // TODO: where fetch this info (cookie?)
        this.agent = window.navigator.userAgent
        this.agentData = window.navigator.userAgentData
        this.window_inner_width = window.innerWidth
        this.window_inner_height = window.innerHeight
    }

}