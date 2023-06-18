
import { Iuser } from "src/user/entities/interfaces/user.interface";
export interface Iadmin extends Iuser {

    email:string;
    password:string;
    
}