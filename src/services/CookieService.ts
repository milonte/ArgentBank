/**
 * Find Cookie by Name
 * @param cookieName 
 * @returns Selected Cookie | null
 */
export function GetCookie(cookieName: string) {
    let cookie: any = {};
    document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName.toUpperCase()] ?
        JSON.parse(cookie[cookieName.toUpperCase()]) :
        null;
}

/**
 * Set / Update Cookie by name
 * @param cookieName 
 * @param body 
 */
export function SetCookie(cookieName: string, body: Object) {
    document.cookie = `${cookieName.toUpperCase()}=${JSON.stringify(body)};SameSite=Strict;`
}

/**
 * Remove cookie by name
 * @param cookieName 
 */
export function RemoveCookie(cookieName: string) {
    if (GetCookie(cookieName)) {
        document.cookie = cookieName.toUpperCase() + '=;Max-Age=-99999999;'
    }
}
