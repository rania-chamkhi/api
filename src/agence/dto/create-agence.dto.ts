import { IsNotEmpty,IsString,IsNumber } from "class-validator";


export class CreateAgenceDto {

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    adresseAg:string;

    @IsNumber()
    @IsNotEmpty()
    tel:string;

    @IsString()
    @IsNotEmpty()
    email:string;
}
