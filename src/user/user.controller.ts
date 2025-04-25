import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./user.schema";
import {CreateUserDto} from "./dto/creat-user.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<User> {
        return await this.userService.createUser(dto.name);
    }
}
