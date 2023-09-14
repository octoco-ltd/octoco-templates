import { UpdateUserMetadataIM, UserIM, UserKYCDetailsVM, UserVM } from '../models/users/user-schema';
import z from 'zod';
import { SumsubApplicantStatusReviewResultSchema } from '../models/sumsub/sumsub-schemas';

export interface UserRepository {
    getAllUsers(): Promise<UserVM[]>;
    createUser(uid: string, user: UserIM): Promise<void>;
    getUserByID(uid: string): Promise<UserVM>;
    updateUser(uid: string, update: UpdateUserMetadataIM): Promise<void>;
    deleteUser(uid: string): Promise<void>;
    updateKycIdAndStatus(userId: string, kycStatus: string, kycId: string): Promise<UserVM>
    assignRoleToUser(userId: string, role: string): Promise<UserVM>
    getUserKycDetails(userId: string): Promise<UserKYCDetailsVM>
    updateUserKycStatus(userId: string, kycStatus: string, reviewResult: z.infer<typeof SumsubApplicantStatusReviewResultSchema> | undefined, kycSubmitted: boolean): Promise<void>
    updateUserType(uid: string, userType: string): Promise<void>

    updateUserDisabledStatus(userId: string, isDisabled: boolean): Promise<void>
}


