import {describe, expect, test} from '@jest/globals';
import {InMemoryExampleClient} from "../src/clients/in-memory/in-memory-example-client";
import {InMemoryExampleRepository} from "../src/repositories/in-memory/in-memory-example-repository";
import {ExampleService} from "../src/services/example-service";


// Instantiate in-memory versions of clients and repos for testing and pass to service layer
const exampleClient = new InMemoryExampleClient()
const exampleRepo = new InMemoryExampleRepository()

const exampleService = new ExampleService(exampleRepo, exampleClient)

describe('The example service', () => {
    test('That a test can run', async () => {
        console.log('The test ran!')
    })
})