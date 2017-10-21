/**
 * Created by rigel on 10/18/17.
 */
import { DataManager }                           from 'data-manager';
import { ValidationController, ValidationRules } from 'aurelia-validation';
import { inject, NewInstance}                    from 'aurelia-framework';

@inject(DataManager, NewInstance.of(ValidationController))
export class Post {
    constructor(DataManager, validationController) {
        this.dataManager = DataManager;
        this.urls = [
            "../src/img/slide-3.jpg",
        ];

        this.users = [];
        this.comment = {name: '', email: '', body: ''};
        this.validationController = validationController;
    }

    attached() {
        ValidationRules
            .ensure('name').required()
            .ensure('email').email().required()
            .ensure('body').required()
            .on(this.comment);
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
}
