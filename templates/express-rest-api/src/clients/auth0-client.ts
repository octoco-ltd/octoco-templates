
export interface Auth0Client {
    assignAdminRoleToUser(userId: string): Promise<void>
    revokeUserAdminRights(userId: string): Promise<void>

    requestPasswordResetEmail(email: string): Promise<void>

    toggleMFA(userId: string, mfaEnabled: boolean): Promise<void>
}