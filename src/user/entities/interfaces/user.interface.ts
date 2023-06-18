import { Document } from "mongoose";
export interface Iuser extends Document {

   
    nom:string;
    prenom:string;
    email:string;
    password:string;
    telephone:number;
    
    ville:string;
    username:string;
    file:string;
    reservation:string;
    refreshtoken:string;
}