/**
 * Created by rigel on 2/22/17.
 */

import { ValidationController, ValidationRules }                  from 'aurelia-validation';
import { inject, NewInstance }                                    from 'aurelia-framework';

@inject(NewInstance.of(ValidationController))
export class Contact {

    constructor(validationController) {
        this.message = {name: '', email: '', message: '', phone: ''};
        this.validationController = validationController;
    }

    attached() {
        ValidationRules
            .ensure('name').required()
            .ensure('email').email().required()
            .ensure('message').required()
            .on(this.message);

    }

    send() {
        console.log(this.validationController);
        let errors = this.validationController.validate();
        errors.then(errors => {
            if (errors.length === 0) {
                /*this.api.saveTask(this.task);*/
            }
        });
    }

    cancel() {

    }
}
