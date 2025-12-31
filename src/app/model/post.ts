import { User } from "./user";

export class Post {
    constructor(
        public message: string,
        public author: User,
        public createdAt: Date
    ) {}
}