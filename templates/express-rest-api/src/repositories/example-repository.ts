import {ExampleIM, ExampleVM} from "../models/users/example-schema";

export interface ExampleRepository {
    getAllExamples(): Promise<ExampleVM[]>;
    createExample(example: ExampleIM): Promise<ExampleVM>;
    getExampleById(id: string): Promise<ExampleVM>;

}


