import { inject, TaskQueue } from 'aurelia-framework';
import 'bootstrap';
import WOW from 'wow';
import { DataManager } from 'data-manager';

@inject(TaskQueue, DataManager)
export class App {
    constructor(taskQueue, dataManager) { // so impress
        this.wow = new WOW( // wow
            {
                boxClass:     'wow',      // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset:       0,          // distance to the element when triggering the animation (default is 0)
                mobile:       true,       // trigger animations on mobile devices (default is true)
                live:         true,       // act on asynchronously loaded content (default is true)
                callback:     function() {
                    // the callback is fired every time an animation is started
                    // the argument that is passed in is the DOM node being animated
                },
                scrollContainer: null // optional scroll container selector, otherwise use window
            }
        );
        this.taskQueue   = taskQueue;
        this.dataManager = dataManager;
    }

    created(v1, v2){ }


    attached() {
        this.taskQueue.queueMicroTask(() => {
            this.wow.init(); // much init
        });

        //this.data = this.dataManager.get('https://jsonplaceholder.typicode.com/posts');// dummy data
    }

    configureRouter(config, router) {
        config.options.pushState = true;
        config.options.root      = '/';
        config.title             = 'Tucson Junksters';

        config.mapUnknownRoutes('home');

        config.map([
            { route: ['home', ''], name: 'home',    moduleId: 'home',    title: 'Home',       nav: true },
            { route: 'about',      name: 'title',   moduleId: 'about',   title: 'About',      nav: true },
            { route: 'blog',       name:  'blog',   moduleId: 'blog',    title: 'Blog',       nav: true },
            { route: 'contact',    name: 'contact', moduleId: 'contact', title: 'Contact',    nav: true }
        ]);

        this.router  = router;
    }

    aData = {
        streetAdr: '8484 E Broadway Blvd',
        city: 'Tucson',
        state: 'AZ',
        zip: '85710',
        phone: '( 520 ) 290-9923'
    };

    businessName       = 'Tucson Junksters';
}