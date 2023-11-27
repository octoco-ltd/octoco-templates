import {describe, test, expect} from '@jest/globals'
import {BadRequest, errorStatusCode, NotFoundError, PaymentRequired, UnAuthorized} from "../../../src/utils/errors";


describe('The errorStatusCode function', () => {
    test('That a status code of 404 is return for a Not Found error', () => {
        // arrange
        const error = new NotFoundError('')

        // act
        const result = errorStatusCode(error)

        // assert
        expect(result).toBe(404)
    })

    test('That a status code of 400 is return for a Bad Request error', () => {
        // arrange
        const error = new BadRequest('')

        // act
        const result = errorStatusCode(error)

        // assert
        expect(result).toBe(400)
    })

    test('That a status code of 401 is return for a Unauthorized error', () => {
        // arrange
        const error = new UnAuthorized('')

        // act
        const result = errorStatusCode(error)

        // assert
        expect(result).toBe(401)
    })

    test('That a status code of 402 is return for a PaymentRequired error', () => {
        // arrange
        const error = new PaymentRequired('')

        // act
        const result = errorStatusCode(error)

        // assert
        expect(result).toBe(402)
    })

    test('That the status code defaults to 500 for generic errors', () => {
        // arrange
        const error = new Error('')

        // act
        const result = errorStatusCode(error)

        // assert
        expect(result).toBe(500)
    })
})