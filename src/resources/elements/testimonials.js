import { bindable } from 'aurelia-framework';
import { BindingEngine } from 'aurelia-binding';


export class Testimonials {
    @bindable testimonial = this.getTestimonial(2, 0);

    constructor() { }

    attached() {
        setInterval((a) => {
            this.testimonial = JSON.parse(JSON.stringify(this.getTestimonial(5, 0)));
        }, 12000);
    }

    testimonialChanged(newValue, oldValue) { }

    clients = [
        {
            name: 'John Doe',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc placerat diam quis nisl vestibulum dignissim.'
        },
        {
            name: 'Juan Doe',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc placerat diam quis nisl vestibulum dignissim.'
        },
        {
            name: 'Bob LaBlah',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc placerat diam quis nisl vestibulum dignissim.'
        },
        {
            name: 'Remy Blah',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc placerat diam quis nisl vestibulum dignissim.'
        },
        {
            name: 'Carl Sagan',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc placerat diam quis nisl vestibulum dignissim.'
        },
        {
            name: 'Tyco Brahe',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc placerat diam quis nisl vestibulum dignissim.'
        }
    ];

    getTestimonial = ((max, min) => {
        let n = Math.floor(Math.random() * (max - min + 1)) + min;
        return ((arr) => arr[n])(this.clients);
    });

    initTestimonial = () => {
        setInterval(() => {
            console.log('run');

            return JSON.parse(JSON.stringify(this.getTestimonial(2, 0)));
        }, 1000);
    }
}

