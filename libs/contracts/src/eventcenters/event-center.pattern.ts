import {  EVENTCENTERPATTERN} from "../shared"

export {EVENTCENTERPATTERN}

export const EVENTCENTERREFUNDPOLICYPATTERN = {
    UPSERT: 'event.center.refundPolicy.upsert',
    FINDBYSERVICEID: 'event.center.refundPolicy.findByServiceId',
}


export const EVENTCENTERBOOKINGPATTERN = {
    FINDALL: 'event.center.booking.findAll',
    FINDONEBYID: 'event.center.booking.findOneById',
    CREATE: 'event.center.booking.create',
    UPDATE: 'event.center.booking.update',
    DELETE: 'event.center.booking.delete',
}

