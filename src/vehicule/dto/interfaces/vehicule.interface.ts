import { Document } from "mongoose";

export interface Iveh extends Document{
   
    modele: string;
    marque: string;
    numMatr: string;
    kilometrage: string;
    typeCarburant: string;
    description: string;
    prix: number;
    compteur: number;
    disponible:boolean;
    ports:number;
    boiteVit:string;
    clima:boolean;
    gps:boolean;
    file: string;
    agenceId:string;
    
}