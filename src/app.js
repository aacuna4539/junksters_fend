import { inject, TaskQueue } from 'aurelia-framework';
import 'bootstrap';
import WOW from 'wow';

@inject(TaskQueue)
export class App {
    constructor(taskQueue) { // so impress
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

        console.log(WOW, taskQueue);

        this.taskQueue = taskQueue;
    }

    created(v1, v2){
        console.log(v1, v2)
    }


    attached() {
        this.taskQueue.queueMicroTask(() => {
            this.wow.init(); // much init
        });
    }

    configureRouter(config, router) {
        config.options.pushState = true;
        config.options.root      = '/';
        config.title             = 'Tucson Junksters';

        config.mapUnknownRoutes('home');

        config.map([
            { route: ['home', ''], name: 'home',   moduleId: 'home',    title: 'Home',       nav: true },
            { route: 'about',      name: 'title',  moduleId: 'about',   title: 'About',      nav: true },
            { route: 'contact',    name: 'contact', moduleId: 'contact', title: 'Contact',    nav: true }
        ]);

        this.router  = router;
    }

    /* TODO: make this an object */
          /*= ' 8484 E Broadway Blvd | Tucson, AZ 85710 | (520) 290-9923';*/
    aData = {
        streetAdr: '8484 E Broadway Blvd',
        city: 'Tucson',
        state: 'AZ',
        zip: '85710',
        phone: '( 520 ) 290-9923'
    };

    businessName       = 'Tucson Junksters';
}