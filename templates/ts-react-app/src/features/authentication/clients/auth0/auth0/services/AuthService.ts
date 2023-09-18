import { IAuthService } from './authInterface';

export class AuthService implements IAuthService {
    private activeAuthProvider: IAuthService;

    constructor(provider: IAuthService) {
        this.activeAuthProvider = provider;
    }

    async login() {
        //
    }

    async logout() {
        //
    }
}