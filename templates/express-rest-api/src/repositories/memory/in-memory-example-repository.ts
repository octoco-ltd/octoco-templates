import { ExampleRepository } from '../example-repository';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from '../../utils/errors';
import {ExampleIM, ExampleSchema, ExampleVM} from "../../models/users/example-schema";


export class InMemoryExampleRepository implements ExampleRepository {
    // The seed is documents we have in our mock database
    constructor(public seed: ExampleVM[]) {
    }


    public seedUsers(seed: ExampleVM[]): void {
        /*
        Use this to add a specific document during unit tests
         */
        this.seed = seed
    }

    public clearSeed(): void {
        /*
        Clear the seed after each unit tests to decouple them
         */
        this.seed = []
    }

    public async getAllExamples(): Promise<ExampleVM[]> {
        return this.seed.map((e) => ExampleSchema.parse(e))
    }

    public async createExample(example: ExampleIM): Promise<ExampleVM> {
        const id = uuidv4();
        this.seed.push(ExampleSchema.parse({id, ...example}))
        const ex = this.seed.find((e) => e.id === id)
        if (!ex) throw new NotFoundError(`Example with ID: ${id} not found`)
        return ExampleSchema.parse(ex)

    }

    public async getExampleById(id: string): Promise<ExampleVM> {
        const ex = this.seed.find((e) => e.id === id)
        if (!ex) throw new NotFoundError(`Example with ID: ${id} not found`)
        return ExampleSchema.parse(ex)
    }

}