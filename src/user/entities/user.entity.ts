import { Schema,SchemaFactory,Prop } from "@nestjs/mongoose";
import { SchemaTypes,Types, Document} from "mongoose";
import * as argon2 from "argon2"
import * as mongoose from 'mongoose';


@Schema({timestamps :true})
export class Userentity{

   
    @Prop({ required: true })
    nom: string;
    @Prop({ required: true })
    prenom: string;
    @Prop({ required: true })
    email: string;
    @Prop({ required: true })
    password:string;
  
    @Prop({ required: true })
    telephone:number;
   
    @Prop({ required: true })
    ville:string;
    @Prop({ required: true })
    username:string;
    
    @Prop({ required: true })
    file:string;
 
    @Prop()
    refreshtoken:string;

    @Prop([{ type:SchemaTypes.ObjectId,ref:'reservation'}])
    reservation!:Types.ObjectId[];
}

export const userSchema = SchemaFactory.createForClass(Userentity).pre("save", async function (){

    this.password = await argon2.hash(this.password);
});