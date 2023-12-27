import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/app/model/cart-item';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cart:Map<string,CartItem>= new Map<string,CartItem>
  totalPrice:number=0

  constructor(public orderService:OrderService){

  }

  ngOnInit(): void {
    this.listCartItem()
  }

  listCartItem(){
    this.cart = this.orderService.userCart
    this.orderService.totalPrice.subscribe(total=> this.totalPrice=total)
  }

  plusBtnClick(currentItem:CartItem){
    
    this.orderService.addToCart(currentItem)
   
  }

  minusBtnClick(currentItem:CartItem){
    this.orderService.decrementItem(currentItem)
  }

  deleteItem(currentItem:CartItem){
    this.orderService.removeItem(currentItem)
  }

}
