/**
 * Created by rigel on 2/22/17.
 */

import {ValidationController, ValidationRules}                  from 'aurelia-validation';
import {inject, NewInstance}                                    from 'aurelia-framework';

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
        async function validate(controller) {
            let result = await controller.validate();
            console.log(result);

            if (result.valid) {
                console.log('sending')
            } else {
                console.log('errors: ', controller.errors)
            }
        }
        validate(this.validationController);
    }

    cancel() { }
}
