
/** 获取时间 Year/month/day hour:minutes:seconds*/
export const getTimer = (str: string = "YY/MM/DD HH:MM:SS") => {
    //			let date:Date = new Date(ObjectSocket.serverTime);
    let date: Date = new Date();
    let dYear: string = (date.getFullYear()).toString();
    let dMouth: string = ((date.getMonth() + 1 < 10) ? "0" : "") + (date.getMonth() + 1).toString();
    let dDate: string = ((date.getDate() < 10) ? "0" : "") + date.getDate().toString();

    let ret: string = "";

    if (str == "HH:MM") {
        ret += ((date.getHours() < 10) ? "0" : "") + date.getHours() + ":";

        ret += ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes();
    }
    else {
        ret += dYear + "/" + dMouth + "/" + dDate + "   ";

        ret += ((date.getHours() < 10) ? "0" : "") + date.getHours() + ":";

        ret += ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes() + ":";

        ret += ((date.getSeconds() < 10) ? "0" : "") + date.getSeconds();
    }

    return ret;
}
