import TokenAdapter from '../adapters/interfaces/TokenAdapter';
import TokenProtocol from '../adapters/interfaces/TokenProtocol';

export default class Session {
    private tokenProtocol: TokenProtocol;
    private tokenAdapter: TokenAdapter;

    constructor(tokenAdapter: TokenAdapter, sessionToken?: TokenProtocol) {
        this.tokenProtocol = sessionToken;
        this.tokenAdapter = tokenAdapter;
    }

    create(userData?: any): TokenProtocol {
        const createdSession = this.tokenAdapter.generate(userData);
        this.tokenProtocol = createdSession;
        return createdSession;
    }

    authenticate(): any {
        if(!this.tokenProtocol) throw new Error("No token registered to authenticate")
        const tokenIsValid = this.tokenAdapter.check(this.tokenProtocol.token);
        return tokenIsValid;
    }
}