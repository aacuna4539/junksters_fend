/**
 * Created by rigel on 10/11/17.
 */
import { http }   from 'resources/http';
import { inject } from 'aurelia-framework';

@inject(http)
export class DataManager {
    constructor(http) {
        this.http = http;
    }

    get(url) {
        if(this.data) {
            return this.data;
        } else {
            return this.http.fetch(url)
                .then(data => {
                    this.data = data;
                    return data;
                });
        }
    }
}