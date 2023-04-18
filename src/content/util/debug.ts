export function debug(f: Function, g: Function, log_level: string = "info") {
    // f is executed if log_level is debug else g is executed
    if (log_level == "debug") {
        f()
    } else {
        g()
    }
}