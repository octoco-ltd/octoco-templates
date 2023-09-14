import { Auth0Client } from '../auth0-client';


export class InMemoryAuth0Client implements Auth0Client {
    // @ts-ignore
    public async assignAdminRoleToUser(userId: string): Promise<void> {
        return
    }
    // @ts-ignore
    public async revokeUserAdminRights(userId: string): Promise<void> {
        return
    }
    // @ts-ignore
    public async requestPasswordResetEmail(email: string): Promise<void> {
        return
    }
    // @ts-ignore
    public async toggleMFA(userId: string, mfaEnabled: boolean): Promise<void>{
        return
    }
}