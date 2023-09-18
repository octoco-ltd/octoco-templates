import { ExampleClient} from '../example-client';
import axios, {  isAxiosError } from 'axios';
import { handleAxiosError } from '../../utils/errors';


export class HttpExampleClient implements ExampleClient {

    public async registerExampleUser(uid: string, email: string): Promise<void> {
        /*
            Assigns an admin role to the user on Auth0
         */

        const options = {
            method: 'POST',
            url: `https://www.exampleUrl.com/users/${uid}`,
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + 'token',
                'cache-control': 'no-cache',
            },
            data: { email },
        };

        try {
            await axios.request(options);

        } catch (err: any) {
            if (isAxiosError(err)) {
                handleAxiosError('HttpExampleClient - registerExampleUser Error', err)
                throw Error('HttpExampleClient - registerExampleUser Error')
            } else {
                throw Error(err.message);
            }
        }

    }





}