import {describe, jest, expect} from "@jest/globals";
import {HttpExampleClient} from "../../../src/clients/http/http-example-client";
import {ExampleService} from "../../../src/services/example-service";
import {FirestoreExampleRepository} from "../../../src/repositories/firestore/firestore-example-repository";
import {ExampleController} from "../../../src/controllers/example-controller";
import {Request, Response} from "express";
import {InMemoryExampleClient} from "../../../src/clients/memory/in-memory-example-client";
import {InMemoryExampleRepository} from "../../../src/repositories/memory/in-memory-example-repository";
import {NotFoundError} from "../../../src/utils/errors";
import {z} from "zod";
import {ExampleIM, ExampleSchema} from "../../../src/models/users/example-schema";

const exampleClient = new InMemoryExampleClient()

const exampleRepo = new InMemoryExampleRepository([])

const exampleService = new ExampleService(exampleRepo, exampleClient)

const exampleController = new ExampleController(exampleService)

describe('The example controller', () => {
    test('That a bad request error is thrown for an incorrect request body', async () => {
        // Arrange
        const incorrectBody = {}
        const req = {} as Request
        const res = {} as Response

        res.status = jest.fn(() => res)
        // @ts-ignore
        res.send = jest.fn((body) => body)

        // Act
        const result = await exampleController.createAnExample(req, res)

        // Assert
        expect(result).toEqual( {
                isSuccess: false,
                value: [
                    {
                        code: 'invalid_type',
                        expected: 'object',
                        received: 'undefined',
                        path: [],
                        message: 'Required'
                    }
                ],
                httpStatus: 400,
                errorMessage: 'ExampleController - createAnExample Error: Request body missing fields'
            }
        )
    })

    test('That a Not Found error thrown from the Service Layer is handled correctly', async () => {
        // Arrange
        const correctBody = {
            createdAt: new Date().toISOString(),
            name: 'name',
            email: 'email',
        }
        const req = {} as Request
        const res = {} as Response

        req.body = correctBody

        res.status = jest.fn(() => res)
        // @ts-ignore
        res.send = jest.fn((body) => body)
        // @ts-ignore
        exampleService.createExample = jest.fn().mockRejectedValue(new NotFoundError('Not found error was thrown'))

        // Act
        const result = await exampleController.createAnExample(req, res)

        // Assert
        expect(result).toEqual( {
                isSuccess: false,
                value: undefined,
                httpStatus: 404,
                errorMessage: 'ExampleController - createAnExample Error: Not found error was thrown'
            }
        )
    })

    test('That a example is correctly created', async () => {
        // Arrange
        const fixedDate = new Date(1466424490000)
        const spy = jest
            .spyOn(global, 'Date')
            .mockImplementation(() => fixedDate)

        const correctBody: ExampleIM = {
            createdAt: new Date().toISOString(),
            name: 'name',
            email: 'email',
        }
        const req = {} as Request
        const res = {} as Response

        req.body = correctBody

        res.status = jest.fn(() => res)
        // @ts-ignore
        res.send = jest.fn((body) => body)
        const expectedResponse = ExampleSchema.parse({...correctBody, id: 'abc'})
        // @ts-ignore
        exampleService.createExample = jest.fn((body) => {return expectedResponse})

        // Act
        const result = await exampleController.createAnExample(req, res)

        // Assert
        expect(result).toEqual( {
                isSuccess: true,
                value: expectedResponse,
                httpStatus: 200,
                errorMessage: ''
            }
        )
    })


})