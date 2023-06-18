import { IsNotEmpty,IsString } from "class-validator";


export class CreateNotificationDto {

    @IsString()
    @IsNotEmpty()
    date:Date;

    @IsString()
    @IsNotEmpty()
    contenu:string;

 
}
