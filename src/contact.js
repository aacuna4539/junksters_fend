/**
 * Created by rigel on 2/22/17.
 */

import { ValidationControllerFactory, ValidationRules }           from 'aurelia-validation';
import { inject }                                                 from 'aurelia-framework';

@inject(ValidationControllerFactory)
export class Contact {

    constructor(controllerFactory) {
        this.message = {name: '', email: '', message: '', phone: ''};
        this.controller = controllerFactory.createForCurrentScope();
    }

    attached() {
        ValidationRules
            .ensure('name').required()
            .ensure('email').email().required()
            .ensure('message').required()
            .on(this.message);
    }

    send() {
        this.controller.validate()
            .then(result => {
                if (result.valid) {
                    /*this.api.saveTask(this.task);*/
                    console.log("sending");
                } else {
                    // do stuff
                }
        });
    }
}
