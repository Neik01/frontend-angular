import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-item';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { api_url } from '../utils/constants/url';
import { OrderDocument } from '../model/interfaces/IOrderDocument';
import { handleImgLinks } from '../utils/helpers/handleImageLinks';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderApi= api_url+"/order"

  userCart:Map<string,CartItem>

  totalPrice:BehaviorSubject<number>=new BehaviorSubject<number>(0);

  constructor(private httpClient:HttpClient) {
    this.userCart=new Map<string,CartItem>();
    
  }


  addToCart(cartItem:CartItem){

    let existIngItem= this.userCart.get(cartItem.product._id)
    if(existIngItem){
      existIngItem.quantity++
    }
    else{
      this.userCart.set(cartItem.product._id,cartItem);
    }
    
    console.log(this.userCart);
    this.computeTotal()
  }


  computeTotal() {
    
    let total:number=0 
    this.userCart.forEach(item=>{
      total+=item.product.price*item.quantity
      console.log(total);
      
    })
   
    
    this.totalPrice.next(total);
  }

  sendOrder(formData:any){

    const add_product_url=this.orderApi+'/addOrder';
    let obj = {
            userName:formData['name'],
            address:formData['address'],
            phone:formData['phone'],
            cart: new Array<CartItem>
          }

    this.userCart.forEach((val,key)=>{
      if(val.quantity!=0)
        obj.cart.push(val);
    })
    
    const options={
      headers: {
        //'Authorization':'Bearer '+localStorage.getItem('token'),
        'Content-type':'application/json'
      },
      withCredetials:true,
      observe:'response' as 'body'
    }
    console.log(obj);
    
    return this.httpClient.post(add_product_url,obj,options);
  }

  decrementItem(cartItem:CartItem){
    let theItem= this.userCart.get(cartItem.product._id)
    if(theItem!.quantity===1){
      this.removeItem(theItem)
    }
    else{
      theItem!.quantity--
      this.computeTotal()
    }
    
    console.log(this.userCart);
    
  }

  removeItem(theItem: CartItem | undefined) {
    this.userCart.delete(theItem!.product._id)
    this.computeTotal()
  }


  getOrders(){
    const getOrdersApi=this.orderApi+'/getOrder';

    return this.httpClient.get<OrderDocument[]>(getOrdersApi)
    .pipe(map(data=>{
    //  data.cart=data.cart.map(cart_item=>{
    //   cart_item.product=handleImgLinks(cart_item.product)
    //   return cart_item
    //  }
    // ) 
        data.forEach(order=>{
          console.log(order.cart);
          order.cart=order.cart.map(cart_item=>{
            cart_item.product=handleImgLinks(cart_item.product)
            return cart_item
          })
        })
        return data
    }))
  }
}



