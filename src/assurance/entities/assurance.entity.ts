import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes ,Types,Document } from "mongoose"; 

@Schema({timestamps:true})

export class Assuranceentity extends Document{

    @Prop()
    name: string;

    @Prop()
    description:string;

    @Prop()
    prix:number;

    /* @Prop([{ type:SchemaTypes.ObjectId,ref:'reservation'}])
    reservation!:Types.ObjectId[]; */

}
export const AssSchema = SchemaFactory.createForClass(Assuranceentity);