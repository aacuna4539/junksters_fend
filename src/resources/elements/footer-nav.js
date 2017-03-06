import {bindable} from 'aurelia-framework';

export class FooterNavCustomElement {
  @bindable value;

  valueChanged(newValue, oldValue) {

  }

  copyright = 'Copyright © Tucson Junksters 2017';
}

