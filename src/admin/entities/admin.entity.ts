import {Schema,SchemaFactory} from "@nestjs/mongoose";
import { Userentity } from "src/user/entities/user.entity";
import { Document } from "mongoose";
import * as argon2 from "argon2"

@Schema()
export class AdminEntity extends Userentity{
 
}
export type AdminDocument = AdminEntity & Document;
export const AdminSchema = SchemaFactory.createForClass(AdminEntity)
.pre("save", async function (){

    this.password = await argon2.hash(this.password);
});