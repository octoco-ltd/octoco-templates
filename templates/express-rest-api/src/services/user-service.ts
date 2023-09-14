import { UserRepository } from '../repositories/user-repository';
import z from 'zod';
import { SumsubApplicantStatusReviewResultSchema } from '../models/sumsub/sumsub-schemas';
import { UpdateUserMetadataIM, UserIM, UserKYCDetailsVM, UserVM } from '../models/users/user-schema';
import { Auth0Client } from '../clients/auth0-client';


export class UserService {
    constructor(private readonly userRepo: UserRepository, private readonly auth0Client: Auth0Client) {
    }

    public async getAllUsers(): Promise<UserVM[]> {
        console.info('getAllUser - UserService');
        return this.userRepo.getAllUsers();
    }

    public async createUser(uid: string, user: UserIM): Promise<void> {
        console.info('createUser - UserService');
        await this.userRepo.createUser(uid, user);
    }

    public async getUserByID(uid: string): Promise<UserVM> {
        console.info('getUserByID - UserService');
        return this.userRepo.getUserByID(uid)
    }

    public async updateUser(uid: string, update: UpdateUserMetadataIM): Promise<void> {
        console.info('updateUser - UserService');
        return this.userRepo.updateUser(uid, update)
    }

    public async deleteUser(uid: string): Promise<void> {
        console.info('deleteUser - UserService');
        return this.userRepo.deleteUser(uid)
    }

    public async assignRoleToUser(userId: string, role: string): Promise<UserVM> {
        console.info('assignRoleToUser - UserService');
        return this.userRepo.assignRoleToUser(userId, role)
    }

    public async getUserKycDetails(userId: string): Promise<UserKYCDetailsVM> {
        console.info('assignRoleToUser - UserService');
        return this.userRepo.getUserKycDetails(userId)
    }

    public async updateSumsubApplicantStatus(userId: string, kycStatus: string, reviewResult: z.infer<typeof SumsubApplicantStatusReviewResultSchema> | undefined, kycSubmitted: boolean): Promise<void> {
        console.info('updateSumsubApplicantStatus - UserService');
        await this.userRepo.updateUserKycStatus(userId, kycStatus, reviewResult, kycSubmitted);
    }

    public async enableUser(userId: string): Promise<void> {
        // sets isDisabled to false
        console.info('enableUser - UserService');
        await this.userRepo.updateUserDisabledStatus(userId, false)
    }

    public async disableUser(userId: string): Promise<void> {
        // sets isDisabled to true
        console.info('disableUser - UserService');
        await this.userRepo.updateUserDisabledStatus(userId, true)
    }

    public async toggleMFA(userId: string, mfaEnabled: boolean): Promise<void> {
        await this.auth0Client.toggleMFA(userId, mfaEnabled)
    }
}