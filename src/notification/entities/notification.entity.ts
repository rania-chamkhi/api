import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes ,Types,Document } from "mongoose"; 

@Schema({timestamps:true})

export class Notificationentity extends Document{

    @Prop()
    date: Date;

    @Prop()
    contenu:string;

    @Prop([{ type:SchemaTypes.ObjectId,ref:'reservation'}])
    reservation!:Types.ObjectId[];

}
export const NotificationSchema = SchemaFactory.createForClass(Notificationentity);

