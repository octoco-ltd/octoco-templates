import * as firebaseAdmin from 'firebase-admin';
import {
    ExampleIM,
    ExampleVM,
    ExampleSchema
} from '../../models/users/example-schema';

import { NotFoundError } from '../../utils/errors';
import { ExampleRepository } from '../example-repository';


export class FirestoreExampleRepository implements ExampleRepository {
    collection: firebaseAdmin.firestore.CollectionReference;

    constructor() {
        this.collection = firebaseAdmin.firestore().collection('example');
    }

    public async getAllExamples(): Promise<ExampleVM[]> {
        console.info('getAllExamples - ExampleRepository');
        const snapshot = await this.collection.get();
        const docs: ExampleVM[] = [];
        snapshot.forEach((doc) => {
            docs.push(
                ExampleSchema.parse({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data()?.createdAt?.toDate()
                }),
            );
        });
        return docs;
    }

    public async createExample(example: ExampleIM): Promise<ExampleVM> {
        console.info('createExample - ExampleRepository');
        const docRef = await this.collection.add(example)

        console.info('Fetching user from DB ')
        const doc = await docRef.get()

        if (!doc.exists) throw new NotFoundError(`Document creation error`)
        return ExampleSchema.parse({id: doc.id, ...doc.data()})
    }

    public async getExampleById(id: string): Promise<ExampleVM> {
        console.info('getExampleById - ExampleRepository');
        const doc = await this.collection.doc(id).get();
        if (!doc.data())
            throw new NotFoundError(`ExampleRepository - Example with ID: ${id} not found`);
        return ExampleSchema.parse({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data()?.createdAt?.toDate()
        });
    }
}