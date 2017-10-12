/**
 * Created by rigel on 3/7/17.
 */
import { HttpClient } from 'aurelia-fetch-client'

export function http() {
    let httpClient = new HttpClient();

    httpClient.configure(config => {
        config
            .useStandardConfiguration()
            .withDefaults({
                credentials: 'same-origin'
            })
            .withBaseUrl('http://localhost:8000/api/')
            .withInterceptor({
                request(request) {
                    console.log(`Requesting ${request.method} ${request.url}`);
                    return request;
                },
                response(response) {
                    console.log(`Received ${response.status} ${response.url}`);
                    return response;
                }
            })
    });

    return httpClient;
}

