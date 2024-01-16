export interface IUserSlice {
    user: any | null, //IUser
    status: 'authenticated' | 'error' | 'idle' | 'loading'
    accessToken: string | null,
    refreshToken: string | null,
    error: null | undefined | string,
}

// export interface IUser {
    
// }