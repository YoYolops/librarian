import jwt from 'jsonwebtoken';
import TokenAdapter from './interfaces/TokenAdapter';
import TokenProtocol from './interfaces/TokenProtocol';

export default class JWTAdapter implements TokenAdapter {
    private secret: string;
    public errors: Error;

    constructor(secretKey: string) {
        this.secret = secretKey;
    }

    generate(data: any): TokenProtocol {
        return {
            readable: true, // wheter the token can be decoded in to data or not
            token: jwt.sign(data, this.secret)
        }
    }

    check(token: string): boolean {
        try {
            const verification = jwt.verify(token, this.secret);
            return true;
        } catch(error) {
            return false;
        }
    }

    decode(token: string): any {
        const decodedTokenData = jwt.verify(token, this.secret);
        return decodedTokenData;
    }
}