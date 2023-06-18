import { IsNotEmpty,IsString } from "class-validator";

export class CreateLoginDto {

   @IsNotEmpty()
   @IsString()
   readonly username:string;

   @IsNotEmpty()
   @IsString()
   readonly email:string;

   @IsNotEmpty()
   @IsString()
   readonly password:string;
}
