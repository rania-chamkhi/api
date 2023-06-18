import { IsNotEmpty,IsString,IsNumber } from "class-validator";

export class CreateAssuranceDto {

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    description:string;

    @IsNumber()
    @IsNotEmpty()
    prix:number;

}
