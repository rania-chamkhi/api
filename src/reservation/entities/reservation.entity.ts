import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes ,Types,Document } from "mongoose";


@Schema({timestamps:true})

export class Reservationentity extends Document{

    @Prop()
    dateReserv:Date;
    @Prop()
    heureResrv:string;
    @Prop()
    dateFinloc:Date;
    @Prop()
    heureRet:string;
    @Prop()
    numPermis:number;
    @Prop()
    prixTotal: number; 

    @Prop({type:SchemaTypes.ObjectId,ref:'user'})
    userId!:Types.ObjectId  ;

    @Prop({type:SchemaTypes.ObjectId,ref:'assurance'})
    assuranceId!:Types.ObjectId  ;


    //relation avec vehicule
    @Prop({ type:SchemaTypes.ObjectId,ref:'vehicule'})
    vehiculeId!:Types.ObjectId;

    @Prop({ type:SchemaTypes.ObjectId,ref:'notification'})
    notification!:Types.ObjectId;



 
   }
   export const ReservationSchema=SchemaFactory.createForClass(Reservationentity);