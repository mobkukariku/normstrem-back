import { IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Length(2, 30)
    name: string;
}
