import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class UpdateRiderDto {
    @ApiProperty({ example: 'Qwerty123*' })
    @IsString()
    @IsOptional()
    @MinLength(9)
    password: string;
    @ApiProperty({ example: 'Hernan' })
    @IsString()
    @IsOptional()
    firstname: string;
    @ApiProperty({ example: 'Escorcia' })
    @IsString()
    @IsOptional()
    lastname: string;
    @ApiProperty({ example: '+573016162926' })
    @IsPhoneNumber()
    @IsOptional()
    phone: string;
}
