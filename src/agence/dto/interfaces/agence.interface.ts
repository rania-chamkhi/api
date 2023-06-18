import { Document } from "mongoose";

export interface Iag extends Document{

 name:string;
 adresseAg:string;
 tel:number;
 email:string; 

}