import {ExampleRepository} from "../repositories/example-repository";
import {ExampleClient} from "../clients/example-client";


export class ExampleService {
    /*
    Business logic of the example entity. This receives its dependencies and will be tested using unit tests.
    Use interfaces to define the types of the dependencies
     */
    constructor(private readonly exampleRepo: ExampleRepository, private readonly exampleClient: ExampleClient) {
    }

}