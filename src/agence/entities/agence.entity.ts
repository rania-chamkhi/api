import { Prop,Schema ,SchemaFactory} from "@nestjs/mongoose";
import { Document ,Types,SchemaTypes } from "mongoose";

@Schema({timestamps:true})

export class Agenceentity extends Document{


    @Prop()
    name: string;

    @Prop()
    adresseAg:string;

    @Prop()
    tel:number;

    @Prop()
    email:string;

    @Prop([{ type:SchemaTypes.ObjectId,ref:'vehicule'}])
    vehiculeId!:Types.ObjectId[];

}
export const AgSchema = SchemaFactory.createForClass(Agenceentity);

