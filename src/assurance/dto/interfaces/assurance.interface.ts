import { Document } from "mongoose";

export interface Iass extends Document{

 name:string;
 description:string;
 prix:number; 

}