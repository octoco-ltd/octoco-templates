import { UserRepository } from '../user-repository';
import { UpdateUserMetadataIM, UserIM, UserKYCDetailsVM, UserTypeEnum, UserVM } from '../../models/users/user-schema';
import { UserKYCDetailsSchema, UserSchema } from '../../models/users/user-schema';
import { NotFoundError } from '../../utils/errors';

export class InMemoryUserRepository implements UserRepository {
    constructor(public seed: UserVM[]) {
    }

    public seedUsers(seed: UserVM[]): void {
        this.seed = seed
    }

    public clearSeed(): void {
        this.seed = []
    }

    public async getAllUsers(): Promise<UserVM[]>{
        return this.seed
    }

    public async createUser(uid: string, user: UserIM): Promise<void>{
        const newUser = UserSchema.parse({
            id: uid,
            ...user
        })
        this.seed.push(newUser)
    }

    public async getUserByID(uid: string): Promise<UserVM>{
        const user = this.seed.find((u) => u.id === uid)
        if(!user) throw new NotFoundError(`UserRepository - getUserByID with ID: ${uid} not found`);
        return user
    }

    public async updateUser(uid: string, update: UpdateUserMetadataIM): Promise<void> {
        const ind = this.seed.findIndex((u) => u.id === uid)
        this.seed[ind] = {...this.seed[ind], ...update}
    }

    public async updateUserType(uid: string, userType: string): Promise<void> {
        const ind = this.seed.findIndex((u) => u.id === uid)
        this.seed[ind] = {...this.seed[ind], userType: UserTypeEnum.enum[userType] }
    }

    public async deleteUser(uid: string): Promise<void> {
        const ind = this.seed.findIndex((u) => u.id === uid)
        this.seed.splice(ind, 1)
    }

    public async updateKycIdAndStatus(userId: string, kycStatus: string, kycId: string): Promise<UserVM> {
        const ind = this.seed.findIndex((u) => u.id === userId)
        this.seed[ind] = {...this.seed[ind], kycStatus, kycId}
        const doc = this.seed.find((u) => u.id === userId)
        if (!doc) throw new NotFoundError(`User with ID: ${userId} not found`)
        return doc
    }

    public async assignRoleToUser(userId: string, role: string): Promise<UserVM> {
        const ind = this.seed.findIndex((u) => u.id === userId)
        this.seed[ind] = UserSchema.parse({...this.seed[ind], role})
        const doc = this.seed.find((u) => u.id === userId)
        if (!doc) throw new NotFoundError(`User with ID: ${userId} not found`)
        return doc
    }

    public async getUserKycDetails(userId: string): Promise<UserKYCDetailsVM> {
        const user = this.seed.find((u) => u.id === userId)
        if (!user) throw new NotFoundError(`User with ID: ${userId} not found`)
        return UserKYCDetailsSchema.parse(user);
    }

    public async updateUserKycStatus(userId: string, kycStatus: string): Promise<void> {
        const ind = this.seed.findIndex((u) => u.id === userId)
        this.seed[ind] = UserSchema.parse({...this.seed[ind], kycStatus})
    }

    public async updateUserDisabledStatus(userId: string, isDisabled: boolean): Promise<void> {
        const ind = this.seed.findIndex((u) => u.id === userId)
        if (ind === -1) throw new NotFoundError(`User ${userId} not found`)
        this.seed[ind] = UserSchema.parse({...this.seed[ind], isDisabled})
    }
}