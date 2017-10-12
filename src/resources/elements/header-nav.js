import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class HeaderNavCustomElement {
    constructor(router) {
        this.router = router;
    }

    copywrite = 'Copyright © Tucson Junksters 2017';

    valueChanged(newValue, oldValue) {
    }
}

