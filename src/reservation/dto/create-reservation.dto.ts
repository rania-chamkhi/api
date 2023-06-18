import { IsString,IsNotEmpty, IsBoolean,IsNumber} from "class-validator";

export class CreateReservationDto {

  

   
    @IsNotEmpty()
    @IsString()
    readonly dateReserv:Date;

   
    @IsNotEmpty()
    @IsString()
    readonly heureResrv:string;

    
    @IsNotEmpty()
    @IsString()
    readonly dateFinloc:Date;

    
    @IsNotEmpty()
    @IsString()
    readonly heureRet:string;

    
    @IsNotEmpty()
    @IsString()
    readonly numPermis:number;



    @IsNotEmpty()
    @IsString()
    userId:string;
   
    @IsNotEmpty()
    @IsString()
    vehiculeId:string;

    @IsNotEmpty()
    @IsString()
    assuranceId:string;
    
    @IsNotEmpty()
    @IsString()
    notification:string;
   
  @IsNotEmpty()
  @IsNumber()
  prixTotal: number; 
}
