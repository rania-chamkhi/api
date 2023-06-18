import {  IsNotEmpty ,IsString } from "class-validator";

export class CreateUserDto {

   
    @IsString()
    @IsNotEmpty()
    readonly nom: string;

    @IsString()
    @IsNotEmpty()
    readonly prenom: string;

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    readonly telephone: number;

    

    @IsString()
    @IsNotEmpty()
    readonly ville: string;

    @IsString()
    @IsNotEmpty()
    readonly username: string;

     @IsString()
     @IsNotEmpty()
      file:string

    @IsString()
    @IsNotEmpty()
    readonly refreshtoken: string;
   
     reservation: string;
}
