import {describe, test, expect, beforeEach, afterEach} from '@jest/globals'

import { ExampleService } from '../src/services/example-service';
import {InMemoryExampleRepository} from "../src/repositories/memory/in-memory-example-repository";
import {InMemoryExampleClient} from "../src/clients/memory/in-memory-example-client";
import {ExampleIMSchema, ExampleSchema} from "../src/models/users/example-schema";
import {z} from "zod";

// Instantiate the InMemory version for testing
const exampleRepo = new InMemoryExampleRepository([])

const exampleClient = new InMemoryExampleClient()
let exampleService: ExampleService;

const initialExampleInDb = ExampleSchema.parse({
    id: 'existing-example',
    createdAt: new Date(),
    name: 'Existing Example',
    email: 'existing@example.com',
    emailVerified: true,
})

beforeEach(() => {
    exampleRepo.seedUsers([initialExampleInDb])
    exampleService = new ExampleService(exampleRepo, exampleClient)
})

afterEach(() => {
    exampleRepo.clearSeed()
})

describe('Example Service Tests', () => {
    test('That all examples can be fetched', async () => {
        const allExamples = await exampleService.getAllExamples()
        expect(allExamples.length).toBe(1)
        expect(allExamples).toEqual([initialExampleInDb])
    })

    test('That a specific example can be fetched', async () => {
        const result = await exampleService.getExampleById(initialExampleInDb.id)
        expect(result.name).toBe(initialExampleInDb.name)
    })

    test('That an error is thrown if an example can\'t be found', async () => {
        const nonExistentId = 'DOES NOT EXIST'
        await expect(exampleService.getExampleById(nonExistentId)).rejects.toThrow()
    })

    test('That an exmaple can be created and stored in the DB', async () => {
        const exampleToAdd = ExampleIMSchema.parse({
            createdAt: new Date(),
            name: 'New Example',
            email: 'new@example.com',
            emailVerified: true,
        })

        const result = await exampleService.createExample(exampleToAdd)
        expect(result.name).toBe(exampleToAdd.name)
    })
})

