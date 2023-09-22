import {ExampleClient} from "../example-client";

export class InMemoryExampleClient implements ExampleClient {
    // @ts-ignore
    public async registerExampleUser(uid: string, email: string): Promise<void> {
        // if the function should have a response just create a mock one
        return
    }

}