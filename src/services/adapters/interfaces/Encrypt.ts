export default interface Encrypt {
    encrypt(value: string): string;
    compare(value: string, compareWith: string): boolean;
}