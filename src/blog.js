/**
 * Created by rigel on 3/10/17.
 */
import  {DataManager}  from 'data-manager';
import {inject} from 'aurelia-framework';
//import { http } from 'resources/http';


@inject(DataManager)
export class Blog {
    constructor(dataManager) {
        this.urls = [
            "src/img/slide-3.jpg",
            "src/img/slide-2.jpg",
            "src/img/slide-1.jpg"
        ];

        this.posts = [];
        this.displayedPosts = [];
        this.dataManager = dataManager;
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
        return opts.el[ action ](opts.attribute, opts.value);
    }

    newerPosts(e) {
        if (this.displayedPosts.includes(this.posts[this.posts.length - 1])) {
            if (!e.target.hasAttribute('disabled')) {
                return this.modifyAttribute({
                    el: e.target,
                    attribute: "disabled",
                    value: "true"
                }, "setAttribute");
            }
        } else {
            let idx = this.posts.indexOf(this.displayedPosts[3]);
            this.displayedPosts = this.posts.slice(idx, idx + 4);
        }

    }

    olderPosts(e) { }
}