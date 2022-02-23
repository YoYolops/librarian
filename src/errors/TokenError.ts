export default class TokenError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, TokenError.prototype);
        this.name = 'User Token Error';
        this.statusCode = 401;
    }
}