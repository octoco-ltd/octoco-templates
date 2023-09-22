import { ExampleRepository } from '../repositories/example-repository';
import { ExampleIM,  ExampleVM } from '../models/users/example-schema';
import { ExampleClient} from '../clients/example-client';


export class ExampleService {
    constructor(private readonly exampleRepo: ExampleRepository, private readonly exampleClient: ExampleClient) {
    }

    public async getAllExamples(): Promise<ExampleVM[]> {
        console.info('getAllExamples - ExampleService');
        return this.exampleRepo.getAllExamples();
    }

    public async createExample(example: ExampleIM): Promise<ExampleVM> {
        console.info('createExample - ExampleService');
        const savedExample = await this.exampleRepo.createExample(example);

        console.info('Registering example with client')
        await this.exampleClient.registerExampleUser(savedExample.id, savedExample.email)

        return savedExample
    }

    public async getExampleById(id: string): Promise<ExampleVM> {
        console.info('getExampleById - ExampleService');
        return this.exampleRepo.getExampleById(id)
    }

}