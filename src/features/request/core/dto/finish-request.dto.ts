import { ApiProperty } from "@nestjs/swagger";
import { IsLatitude, IsLongitude, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class FinishRequestDto {
    
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    acceptance_token: string;

    @ApiProperty({example:'tok_test_37539_7B50E65050CDf6517344041324E9dD7a'})
    @IsString()
    @IsNotEmpty()
    payment_method_token: string;
    
    @ApiProperty({example:'4332'})
    @IsString()
    @IsNotEmpty()
    payment_source_id: string;

    @ApiProperty({example:'NEQUI'})
    @IsString()
    @IsNotEmpty()
    type: string;



}
