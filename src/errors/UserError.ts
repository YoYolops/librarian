export default class UserError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, UserError.prototype);
        this.name = 'User Error';
        this.statusCode = 401;
    }
}