import { Document } from "mongoose";

export interface Inot extends Document{

 date:Date;
 contenu:string;
reservation:string;

}
