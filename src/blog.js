/**
 * Created by rigel on 3/10/17.
 */
import { DataManager }  from 'data-manager';
import { inject }       from 'aurelia-framework';
import { Paginate }     from 'paginate';
import { Utils } from 'resources/utils'

@inject(DataManager, Paginate, Utils)
export class Blog {
    constructor(dataManager, paginate, utils) {
        this.urls = [
            "src/img/slide-3.jpg",
            "src/img/slide-2.jpg",
            "src/img/slide-1.jpg"
        ];

        this.displayedPosts = [];
        this.dataManager    = dataManager;
        this.paginate       = paginate;
        this.utils          = utils;
        this.pageNum        = 0;
        this.posts          = [];

        this.btnOpts = {
            backgroundColor: 'lightgrey',
            pointerEvents  : 'none',
            cursor         : 'default',
        };
    }

    created(owningView, myView) { }

    attached() {  // bug on refresh
        if(this.dataManager.data && this.dataManager.data.bodyUsed === false)  {
            this.dataManager.data.json().then( x => {
                    x.map(x => {

                        // add dates and urls to our dummy data
                        x.date = this.randomDate(new Date(2017, 0, 1), new Date());
                        x.url  = this.urls[Math.floor(Math.random() * (2 + 1))];

                    });
                this.dataManager.data = x;
                this.posts            = x.sort((a, b) => b.date - a.date);
                this.displayedPosts   = this.posts.slice(0, 4);
            });
        } else {
            this.posts          = this.dataManager.data;
            this.displayedPosts = this.posts.slice(0, 4);
        }
    }

    // helper for dummy data
    randomDate(start, end) {
        return new Date(start.getTime()
            + Math.random()
            * (end.getTime() - start.getTime()));
    }

    modifyAttribute(el, opts, attr) {
        this.utils.mapFromObject(opts)
            .forEach((val, key) => el[ attr ][ key ] = val);
        return el;
    }

    page(e, action) {
        let tmp = this.paginate.page({
            array  : this.posts,
            pageNum:
                action === 'decrement'
                ? this.pageNum - 1
                : this.pageNum + 1
        });

        this.pageNum        = tmp.num;
        this.displayedPosts = tmp.arr;

        if(!this.pager) this.pager = e.target.cloneNode(true);

        if (this.displayedPosts.includes(this.posts[0])) {
            this.modifyAttribute(e.target, this.btnOpts, 'style')
        } else if (this.displayedPosts.includes(this.posts[this.posts.length - 1])) {
            this.modifyAttribute(e.target, this.btnOpts, 'style');
        }
    }
}