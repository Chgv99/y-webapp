import { UserDetails } from "./user-details";

export class User {
    constructor(
        public uuid: string,
        public username: string,
        public role: string,
        public detail: UserDetails,
        public createdAt: Date
    ) {}
}