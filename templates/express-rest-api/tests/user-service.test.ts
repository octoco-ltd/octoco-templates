import {describe, test, expect, beforeEach, afterEach} from '@jest/globals'
import { InMemoryUserRepository } from '../src/repositories/memory/in-memory-user-repository';
import { UserInsertModelSchema, UserRolesEnum, UserSchema } from '../src/models/users/user-schema';
import { UserService } from '../src/services/user-service';
import { UpdateUserMetadataIM } from '../src/models/users/user-schema';

const userRepo = new InMemoryUserRepository([])
let userService: UserService;

const initialUserInDB = UserSchema.parse({
    id: 'AABBCC',
    createdAt: new Date(),
    name: "Test User",
    email: 'test@octoco.ltd',
    role: UserRolesEnum.enum.USER
})

beforeEach(() => {
    userRepo.seedUsers([initialUserInDB])
    userService = new UserService(userRepo)
})

afterEach(() => {
    userRepo.clearSeed()
})

describe('User Service Tests', () => {
    test('that all users can be fetched from our repo', async () => {
        const users = await userService.getAllUsers();
        expect(users.length).toBe(1);
        expect(users[0].name).toBe(initialUserInDB.name);
    });

    test('that a user can be added to our DB', async () => {
        const userToBeAdded = UserInsertModelSchema.parse({
            createdAt: new Date(),
            name: "New User",
            email: 'new@octoco.ltd',
            role: UserRolesEnum.enum.USER
        })

        await userService.createUser('DDEEFF', userToBeAdded)
        const users = await userService.getAllUsers()
        expect(users.length).toBe(2);
    });

    test('that a user can be fetched from our DB', async () => {
        const user = await userService.getUserByID(initialUserInDB.id)
        expect(user.id).toBe(initialUserInDB.id)
    });

    test('that a user can be updated in our DB', async () => {
        const update: UpdateUserMetadataIM = {email: 'new-email@octoco.ltd'}
        await userService.updateUser(initialUserInDB.id, update)
        const user = await userService.getUserByID(initialUserInDB.id)
        expect(user.email).toBe(update.email)
    });


    test('that a user can be deleted from our DB', async () => {
        await userService.deleteUser(initialUserInDB.id)
        const users = await userService.getAllUsers()
        expect(users.length).toBe(0)
    });

    test('that a user can be assigned a role', async () => {
        const roleToBeAssigned = 'ADMIN'
        const user = await userService.assignRoleToUser(initialUserInDB.id, roleToBeAssigned)
        expect(user.role).toBe(roleToBeAssigned)
    })

    test('that a users KYC details can be fetched', async () => {
        const res = await userService.getUserKycDetails(initialUserInDB.id)
        expect(res.kycSubmitted).toBe(false)
    })

    test('that a user\'s Sumsub KYC details can be updated', async () => {
        await userService.updateSumsubApplicantStatus(initialUserInDB.id, 'init', undefined, false)
        const res = await userService.getUserKycDetails(initialUserInDB.id)
        expect(res.kycStatus).toBe('init')
        expect(res.kycSubmitted).toBe(false)
    })

    test('That a user can be disbaled', async () => {
        await userService.disableUser(initialUserInDB.id)
        const user = await userService.getUserByID(initialUserInDB.id)
        expect(user.isDisabled).toBe(true)
    })

    test('That a user can be enabled', async () => {
        await userService.enableUser(initialUserInDB.id)
        const user = await userService.getUserByID(initialUserInDB.id)
        expect(user.isDisabled).toBe(false)
    })

})

