import {describe, test, expect, jest} from "@jest/globals";
import {Request, Response} from "express";
import {isAdmin} from "../../../src/middleware/authentication";

describe('The authentication middleware', () => {
    test('That an admin user can pass the admin middleware if they have an admin permission as a permissions array', () => {
        // arrange
        // @ts-ignore
        const req = {auth:{payload:{permissions: ['admin']}}} as Request
        const res = {} as Response
        const next = jest.fn(() => {
            return "Next function called"
        })

        // Act
        const result = isAdmin(req, res, next)

        // Assert
        expect(result).toBe('Next function called')
    })

    test('That an admin user can pass the admin middleware if they have an admin permission', () => {
        // arrange
        // @ts-ignore
        const req = {auth:{payload:{permissions: 'admin'}}} as Request
        const res = {} as Response
        const next = jest.fn(() => {
            return "Next function called"
        })

        // Act
        const result = isAdmin(req, res, next)

        // Assert
        expect(result).toBe('Next function called')
    })

    test('That an admin user can not pass the admin middleware if they have do not have admin permission as in permissions array', () => {
        // arrange
        // @ts-ignore
        const req = {auth:{payload:{permissions: ['user']}}} as Request
        const res = {} as Response
        res.status = jest.fn(() => res)
        // @ts-ignore
        res.send = jest.fn((body) => body)

        const next = jest.fn(() => {
            return "Next function called"
        })

        // Act
        const result = isAdmin(req, res, next)

        // Assert
        expect(result).toEqual({
            isSuccess: false,
            value: null,
            httpStatus: 401,
            errorMessage: 'Unauthorized',
        })
    })

    test('That the admin auth middleware can\'t be passed if you don\'t have permissions payload', () => {
        // arrange
        // @ts-ignore
        const req = {} as Request
        const res = {} as Response
        res.status = jest.fn(() => res)
        // @ts-ignore
        res.send = jest.fn((body) => body)

        const next = jest.fn(() => {
            return "Next function called"
        })

        // Act
        const result = isAdmin(req, res, next)

        // Assert
        expect(result).toEqual({
            isSuccess: false,
            value: null,
            httpStatus: 401,
            errorMessage: 'Unauthorized',
        })
    })

})