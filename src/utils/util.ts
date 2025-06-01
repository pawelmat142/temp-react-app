export abstract class Util {
    
    public static prepareErrorMsg(err: any, defaultMsg?: string): string {
        let msg = defaultMsg || "Something went wrong.";
        if (err && typeof err === 'object') {
            let rawMsg = '';
            if (err.code && typeof err.code === 'string' && err.message) {
                rawMsg = err.message;
            } else if (err.error && err.error.message) {
                rawMsg = err.error.message;
            }
            if (rawMsg) {
                // Extract only the part after the colon
                const colonIdx = rawMsg.indexOf(':');
                let afterColon = colonIdx !== -1 ? rawMsg.slice(colonIdx + 1).trim() : rawMsg;
                // Remove text in parentheses (e.g., "xxx (yyy)")
                afterColon = afterColon.replace(/\s*\(.*?\)\s*/g, '').trim();
                msg = afterColon;
            }
        } else if (err && typeof err === 'string') {
            return err
        }
        return msg
    }
    
    public static beforeToday(date: Date | string): boolean {
        let d: Date;
        if (typeof date === "string") {
            d = new Date(date);
        } else {
            d = date;
        }
        d.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return d.getTime() <= (today.getTime() - 24 * 60 * 60 * 1000);
    }
}