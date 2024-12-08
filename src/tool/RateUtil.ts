const moment = require('moment');
export class RateUtil {
    private static isWithinRate(timestamp: number, rate: any): boolean {
        const { unit, time } = rate;
        const now = moment();
        const past = moment(timestamp);

        switch (unit) {
            case 'seconds':
                return now.diff(past, 'seconds') < time;
            case 'minutes':
                return now.diff(past, 'minutes') < time;
            case 'hours':
                return now.diff(past, 'hours') < time;
            case 'days':
                return now.diff(past, 'days') < time;
            default:
                throw new Error('Invalid unit');
        }
    }

    static illegalTime(rate: any, pastTime?: number): boolean {
        if (rate.open === false){
            return true
        }
        if (!pastTime){
            return false
        }
        return RateUtil.isWithinRate(pastTime, rate);
    }

}