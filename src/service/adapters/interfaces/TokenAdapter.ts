export default interface TokenAdapter {
    generate(data?: any): any;
    check(token: string): any;
}