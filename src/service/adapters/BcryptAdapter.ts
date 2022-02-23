import bcrypt from 'bcrypt';
import Encrypt from './interfaces/Encrypt';

export default class BcryptAdapter implements Encrypt {
    private salt = 10;

    constructor(salt: number) {
        this.salt = salt || 10
    }

    encrypt(value: string): string {
        return bcrypt.hashSync(value, this.salt);
    }

    compare(value: string, compareWith: string): boolean {
        return bcrypt.compareSync(value, compareWith)
    }
}