export class User {
    constructor(
        public uuid: string,
        public username: string,
        public role: string,
        public createdAt: Date
    ) {}
}