/**
 * Created by rigel on 2/18/17.
 */
export class Home {
    message = 'This is home';

    constructor() {
        let data = $.get('localhost:8000/pages/2');

        data.then((d) => console.log('data', d));
    }
}