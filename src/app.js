import { inject, TaskQueue } from 'aurelia-framework';
import { DataManager }       from 'data-manager';
import WOW                   from 'wow';
import 'bootstrap';
import { Utils } from 'resources/utils';

@inject(TaskQueue, DataManager)
export class App {
    constructor(taskQueue, dataManager) {
        this.taskQueue = taskQueue;
        this.dataManager = dataManager;
        this.url = 'https://jsonplaceholder.typicode.com/posts';


        this.wow = new WOW( // wow
            {
                boxClass: 'wow',      // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset: 0,          // distance to the element when triggering the animation (default is 0)
                mobile: true,       // trigger animations on mobile devices (default is true)
                live: true,       // act on asynchronously loaded content (default is true)
                callback: function () {
                    // the callback is fired every time an animation is started
                    // the argument that is passed in is the DOM node being animated
                },
                scrollContainer: null // optional scroll container selector, otherwise use window
            }
        );

        async function getData(dm, url) {
            dm.data = await dm.get(url);// dummy data
            let response = await dm.data.response;
            if (dm.data.status !== 200) {
                console.log(`Something went wrong. Status: ${response.status}`);
                return
            }
            return dm.data;
        }
        getData(this.dataManager, this.url);
    }

    created(v1, v2) { }

    attached() {
        this.taskQueue.queueMicroTask(() => {
            this.wow.init(); // much init
        });
    }

    configureRouter(config, router) {
        config.options.pushState = true;
        config.options.root = '/';
        config.title = 'Tucson Junksters';

        config.mapUnknownRoutes('home');

        config.map([
            {route: ['home', ''], name: 'home',      moduleId: 'home',      title: 'Home',    nav: true},
            {route: 'about',      name: 'title',     moduleId: 'about',     title: 'About',   nav: true},
            {route: 'blog',       name: 'blog',      moduleId: 'blog',      title: 'Blog',    nav: true},
            {route: 'post/:id',   name: 'post', moduleId: 'post', title: 'Post'              },
            {route: 'contact',    name: 'contact',   moduleId: 'contact',   title: 'Contact', nav: true}
        ]);

        this.router = router;
    }

    aData = {
        streetAdr: '8484 E Broadway Blvd',
        city: 'Tucson',
        state: 'AZ',
        zip: '85710',
        phone: '( 520 ) 290-9923'
    };

    businessName = 'Tucson Junksters';
}