export default class SecurityError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, SecurityError.prototype);
        this.name = 'User Error';
        this.statusCode = 403;
    }
}