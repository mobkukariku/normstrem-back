import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "./user.schema";

@Injectable()
export class UserService {
    constructor(  @InjectModel('User') private userModel: Model<User>,) {}

    async createUser(name: string): Promise<User> {
        try {
            const user = new this.userModel({ name });
            return await user.save();
        } catch (error) {
            throw new InternalServerErrorException('Не удалось создать пользователя');
        }
    }

}
