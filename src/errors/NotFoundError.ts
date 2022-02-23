export default class NotFoundError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, NotFoundError.prototype);
        this.name = 'The resources requested where not found';
        this.statusCode = 404;
    }
}