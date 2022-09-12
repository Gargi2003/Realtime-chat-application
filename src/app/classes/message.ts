import { User } from "./user";
export class Message {
    message: string;
    createdAt: Date;
    sender: User;

    constructor({ message, createdAt, sender }: { message: string, createdAt: Date, sender: User }) {
        this.createdAt = createdAt;
        this.message = message;
        this.sender = new User(sender);
    }
}
