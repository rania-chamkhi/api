import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes ,Types,Document } from "mongoose"; 



enum ContactType {
    information = "information",
    feedback = "feedback",
    reclamation = "reclamation",
}


@Schema({timestamps:true})
export class Contactentity extends Document{

    @Prop()
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop()
    phone: string;

    @Prop()
    subject:string;

    @Prop()
    message:string;

    @Prop({ type: String, enum: ContactType, default: ContactType.information })
    type: ContactType;

    @Prop({type:SchemaTypes.ObjectId,ref:'reservation'})
    reservationId!:Types.ObjectId  ;

}
export const ContactSchema = SchemaFactory.createForClass(Contactentity);

