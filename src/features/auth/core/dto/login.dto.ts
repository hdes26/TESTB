import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'driver@wompi.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @ApiProperty({ example: 'Qwerty123*' })
    @IsString()
    @IsNotEmpty()
    password: string;

}
