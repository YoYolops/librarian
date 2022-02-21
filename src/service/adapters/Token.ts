import jwt from 'jsonwebtoken';

export default class JWTAdapter {
    private secret;

    constructor(secretKey: string) {
        this.secret = secretKey;
    }

    encode(data: any): any {
        return jwt.sign(data, this.secret)
    }

    check(token: string): any {
        return jwt.verify(token, this.secret)
    }
}