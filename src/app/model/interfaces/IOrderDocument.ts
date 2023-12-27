import { CartItem } from "../cart-item";
import { User } from "../user";

export interface OrderDocument{
    _id:string,
    address:string,
    phone:string,
    user:User,
    cart:CartItem[],

}