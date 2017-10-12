/**
 * Created by rigel on 3/9/17.
 */
import { http } from 'resources/http';
import { inject } from 'aurelia-framework';

@inject(http)
export class Home {
    constructor(http){
        this.httpClient = http;

       /* this.httpClient.fetch('pages/2', {
            method: 'GET',
            headers: {
                'Accept': 'text/html',
                'Content': 'application/html'
            }
        }).then((response => {
            if(response.status !== 200) {
                console.log(`Something went wrong. Status: ${response.status}`);
                return
            }

            response.text().then( x => {
                this.data = x;
            } );
        }));*/
    }
}
