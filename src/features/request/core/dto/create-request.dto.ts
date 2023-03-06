import { ApiProperty } from "@nestjs/swagger";
import { IsLatitude, IsLongitude, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateRequestDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    riderId: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsLatitude()
    lat: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsLongitude()
    lng: string;


}
