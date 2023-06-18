import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import {SchemaTypes,Types, Document } from "mongoose";

@Schema({timestamps:true})

export class Vehiculeentity extends Document{

    @Prop()
    modele: string;
  
    @Prop({ required: true })
    marque: string;
  
    @Prop({ required: true, unique:true})
    numMatr: string;

    @Prop()
    kilometrage: string;
  
    @Prop()
    typeCarburant: string;
  
    @Prop()
    prix: number;
  
    @Prop()
    description: string;
  
    @Prop()
    ports: number;

    @Prop()
    boiteVit:string;

    @Prop()
    clima:boolean;

    @Prop()
    gps:boolean;

    @Prop({ default: true})
    disponible: boolean;

    @Prop({required: true}) 
    file:string;


    

//relation avec reservation
    @Prop([{type:SchemaTypes.ObjectId,ref:'reservation'}])
    reservationId!:Types.ObjectId[]  ;

    @Prop({type:SchemaTypes.ObjectId,ref:'agence'})
    agenceId!:Types.ObjectId  ;
  }
  
export const VehiculeSchema = SchemaFactory.createForClass(Vehiculeentity);
