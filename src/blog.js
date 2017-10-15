/**
 * Created by rigel on 3/10/17.
 */
import {DataManager}  from 'data-manager';
import {inject}       from 'aurelia-framework';
import {Paginate}     from 'paginate';

@inject(DataManager, Paginate)
export class Blog {
    constructor(dataManager, paginate) {
        this.urls = [
            "src/img/slide-3.jpg",
            "src/img/slide-2.jpg",
            "src/img/slide-1.jpg"
        ];

        this.posts = [];
        this.displayedPosts = [];
        this.dataManager = dataManager;
        this.paginate = paginate;
        this.pageNum = 0;
    }

    created(owningView, myView) {
    }

    attached() {
        if (this.posts.length > 0 || this.dataManager.data) {
            this.posts = this.dataManager.data.sort((a, b) => b.date - a.date);
            this.displayedPosts = this.posts.slice(0, 4);
            return;
        }

        this.dataManager.get('https://jsonplaceholder.typicode.com/posts')// dummy data
            .then((response => {
                if (response.status !== 200) {
                    console.log(`Something went wrong. Status: ${response.status}`);
                    return
                }
                response.json().then(x => {
                    this.dataManager.data = x;

                    // add dates and urls to our dummy data
                    this.dataManager.data.map(x => {
                        x.date = this.randomDate(new Date(2017, 0, 1), new Date());
                        x.url = this.urls[Math.floor(Math.random() * (2 + 1))];

                    });
                    this.posts = this.dataManager.data.sort((a, b) => b.date - a.date);
                    this.displayedPosts = this.posts.slice(0, 4);
                    this.displayedPosts.forEach(x => console.log( x.date))
                });
            }));
    }

    // helper for dummy data
    randomDate(start, end) {
        return new Date(start.getTime()
            + Math.random()
            * (end.getTime() - start.getTime()));
    }

    modifyAttribute(opts, action) {
        if (opts.el.hasAttribute(action)) return;
        return opts.el[action](opts.attribute, opts.value);
    }

    page(e, action) {

        //todo: check for first or last el in arr, disable btn accordingly

        let tmp = this.paginate.page({
            array: this.posts,
            pageNum: action === 'decrement' ? this.pageNum - 1 : this.pageNum + 1
        });

        this.pageNum = tmp.num;
        this.displayedPosts = tmp.arr;
    }
}