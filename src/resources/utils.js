/**
 * Created by rigel on 10/17/17.
 */
export class Utils {
    take = (n, arg) => {

    };

    last = arg => {
        if(Array.isArray(arg) || typeof arg === 'string') {
            return arg[arg.length -1];
        }
    };

    mapFromObject = obj => {
        return new Map(Object.entries(obj));
    }
}

