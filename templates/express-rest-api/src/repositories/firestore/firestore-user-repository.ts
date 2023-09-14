import * as firebaseAdmin from 'firebase-admin';
import { UpdateUserMetadataIM, UserIM, UserKYCDetailsVM, UserVM } from '../../models/users/user-schema';
import { UserKYCDetailsSchema, UserSchema } from '../../models/users/user-schema';
import { NotFoundError } from '../../utils/errors';
import { UserRepository } from '../user-repository';
import z from 'zod';
import { SumsubApplicantStatusReviewResultSchema } from '../../models/sumsub/sumsub-schemas';

export class FirestoreUserRepository implements UserRepository {
    collection: firebaseAdmin.firestore.CollectionReference;

    constructor() {
        this.collection = firebaseAdmin.firestore().collection('users');
    }

    public async getAllUsers(): Promise<UserVM[]> {
        console.info('getAllUsers - UserRepository');
        const snapshot = await this.collection.get();
        const docs: UserVM[] = [];
        snapshot.forEach((doc) => {
            docs.push(
                UserSchema.parse({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate(),
                    firstPlay: doc.data().firstPlay?.toDate(),
                    lastPlay: doc.data().lastPlay?.toDate(),
                }),
            );
        });
        return docs;
    }

    public async createUser(uid: string, user: UserIM): Promise<void> {
        console.info('createUser - UserRepository');
        await this.collection.doc(uid).set(user);
    }

    public async getUserByID(uid: string): Promise<UserVM> {
        console.info('getUserByID - UserRepository');
        const doc = await this.collection.doc(uid).get();
        if (!doc.data())
            throw new NotFoundError(`UserRepository - getUserByID with ID: ${uid} not found`);
        return UserSchema.parse({
            id: uid,
            ...doc.data(),
            createdAt: doc.data()?.createdAt?.toDate(),
            firstPlay: doc.data()?.firstPlay?.toDate(),
            lastPlay: doc.data()?.lastPlay?.toDate(),
        });
    }

    public async updateUser(uid: string, update: UpdateUserMetadataIM): Promise<void> {
        console.info('updateUser - UserRepository');
        await this.collection.doc(uid).update(update);
    }

    public async updateUserType(uid: string, userType: string): Promise<void> {
        console.info('updateUserType - UserRepository');
        await this.collection.doc(uid).update({userType});
    }

    public async deleteUser(uid: string): Promise<void> {
        console.info('deleteUser - UserRepository');
        await this.collection.doc(uid).delete();
    }

    public async updateKycIdAndStatus(userId: string, kycStatus: string, kycId: string): Promise<UserVM> {
        console.info('updateKycIdAndStatus - UserRepository');
        await this.collection.doc(userId).update({ kycStatus, kycId });
        const doc = await this.collection.doc(userId).get();
        if (!doc.data()) throw new NotFoundError(`User with ID: ${userId} not found`);
        return UserSchema.parse({
            id: userId,
            ...doc.data(),
            createdAt: doc.data()?.createdAt?.toDate(),
            firstPlay: doc.data()?.firstPlay?.toDate(),
            lastPlay: doc.data()?.lastPlay?.toDate(),
        });
    }

    public async assignRoleToUser(userId: string, role: string): Promise<UserVM> {
        console.info('assignRoleToUser - UserRepository');
        await this.collection.doc(userId).update({ role });
        const doc = await this.collection.doc(userId).get();
        if (!doc.data()) throw new NotFoundError(`User with ID: ${userId} not found`);
        return UserSchema.parse({
            id: userId,
            ...doc.data(),
            createdAt: doc.data()?.createdAt?.toDate(),
            firstPlay: doc.data()?.firstPlay?.toDate(),
            lastPlay: doc.data()?.lastPlay?.toDate(),
        });
    }

    public async getUserKycDetails(userId: string): Promise<UserKYCDetailsVM> {
        console.info('getUserKycDetails - UserRepository');
        const doc = await this.collection.doc(userId).get();
        if (!doc.data()) throw new NotFoundError(`User with ID: ${userId} not found`);
        return UserKYCDetailsSchema.parse(doc.data());
    }

    public async updateUserKycStatus(userId: string, kycStatus: string, reviewResult: z.infer<typeof SumsubApplicantStatusReviewResultSchema> | undefined, kycSubmitted: boolean): Promise<void> {
        console.info('updateUserKycStatus - UserRepository');
        if (reviewResult) {
            await this.collection.doc(userId).update({ kycStatus, kycReviewResult: reviewResult, kycSubmitted});
        } else {
            await this.collection.doc(userId).update({ kycStatus, kycSubmitted });
        }
    }

    public async updateUserDisabledStatus(userId: string, isDisabled: boolean): Promise<void> {
        console.info('updateUserDisabledStatus - UserRepository');
        await this.collection.doc(userId).update({ isDisabled });
    }
}