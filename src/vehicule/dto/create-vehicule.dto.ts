import { IsString,IsNotEmpty,IsNumber,isBoolean, IsBoolean } from "class-validator";

export class CreateVehiculeDto {

    @IsString()
    @IsNotEmpty()
    modele: string;

    @IsString()
    @IsNotEmpty()
    marque: string;

    @IsString()
    @IsNotEmpty()
    numMatr: string;

    @IsNumber()
    @IsNotEmpty()
    kilometrage: string;

    @IsString()
    @IsNotEmpty()
    typeCarburant: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    prix: number;

    @IsNumber()
    @IsNotEmpty()
    compteur: number;

    @IsNumber()
    @IsNotEmpty()
    disponible: boolean;

    @IsNumber()
    @IsNotEmpty()
    ports: number;
    
    @IsNumber()
    @IsNotEmpty()
    boiteVit: string;

    @IsNotEmpty()
    clima: boolean;

    @IsNumber()
    @IsNotEmpty()
    gps: boolean;


    @IsString()
    @IsNotEmpty()
    file:string;

    @IsNotEmpty()
    @IsString()
    agenceId:string;

    
}
