import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsLowercase, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class CreateDriverDto {
    @ApiProperty({ example: 'driver@wompi.com' })
    @IsEmail()
    @IsNotEmpty()
    @IsLowercase()
    email: string;
    @ApiProperty({ example: 'Qwerty123*' })
    @IsString()
    @IsNotEmpty()
    @MinLength(9)
    password: string;
    @ApiProperty({ example: 'Hernan' })
    @IsString()
    @IsNotEmpty()
    firstname: string;
    @ApiProperty({ example: 'Escorcia' })
    @IsString()
    @IsNotEmpty()
    lastname: string;
    @ApiProperty({ example: '+573016162926' })
    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    currentLat: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    currentLng: string;
}
