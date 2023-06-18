import { Document } from "mongoose";

export interface Ires extends Document{
  
    dateReserv:Date;
    heureResrv:string;
    dateFinloc:Date;
    heureRet:string;
    numPermis:number;
    assuranceId:string;
    userId:string;
    vehiculeId:string;
    prixTotal: number; 
    notification:string;
    
}