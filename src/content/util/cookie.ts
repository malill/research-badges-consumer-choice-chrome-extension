// https://www.w3schools.com/js/js_cookies.asp

export function setCookie(cname: string, cvalue: string, exhours: number) {
    // exhours = 0 for session cookie
    const d = new Date();
    d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    return cvalue;
}

export function getCookie(cname: string) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function checkCookie(cname: string, cvalue: any, exhours: number) {
    let cookie = getCookie(cname);
    if (cookie != "") {
        return cookie;
    } else {
        return setCookie(cname, cvalue.toString(), exhours);
    }
}