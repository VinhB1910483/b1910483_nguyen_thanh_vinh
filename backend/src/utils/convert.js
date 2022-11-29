import { ObjectId } from 'mongodb';

/**
 * Convert req query String -> Array 
 * @param object 
 * @returns Array
 */
export const convertStringToArray = (object) => {
    return (typeof object === 'string') ? Array(object) : object
}
export function extractData(payload) {
    // Remove undefined fields
    Object.keys(payload).forEach(
        (key) => payload[key] === undefined && delete payload[key]
    );
    return payload;
}
export function toRegExpFilter(payload) {
    Object.keys(payload).forEach(
        (key) => {
            if (payload[key] === undefined ||
                payload[key] === null ||
                payload[key] === 'null' ||
                payload[key] === ''
            ) {
                delete payload[key]
            } else {
                if (typeof payload[key] == 'object') payload[key] = payload[key].join("|");
                payload[key] = { $regex: new RegExp(payload[key]), $options: "i" }
            }
        }
    );
    return payload;
}
export function toInArrayFilter(payload) {
    Object.keys(payload).forEach(
        (key) => {
            if (payload[key] === undefined ||
                payload[key] === null ||
                payload[key] === 'null' ||
                payload[key] === ''
            ) {
                delete payload[key]
            } else if (typeof payload[key] === 'string' || typeof payload[key] === 'number') {
                payload[key] = { $in: [payload[key]] }

            } else
                payload[key] = { $in: payload[key] }
        }
    );
    return payload;
}

export function toIdFilter(payload) {
    Object.keys(payload).forEach(
        (key) => {
            if (payload[key] === undefined ||
                payload[key] === 'undefined' ||
                payload[key] === null ||
                payload[key] === 'null' ||
                payload[key] === ''
            ) {
                delete payload[key]
            }
            else {
                console.log(payload);
                payload[key] = ObjectId(payload[key])
            }
        }
    );
    return payload;
}