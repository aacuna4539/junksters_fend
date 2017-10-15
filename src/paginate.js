/**
 * Created by rigel on 10/14/17.
 */

export class Paginate {

    paginate(pageNumber, array, pageSize = 4) {
        return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
    }

    page(opts) {
        return {
            arr: this.paginate(opts.pageNum, opts.array),
            num: opts.pageNum
        }
    }
}

