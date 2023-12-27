import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/cart-item';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit{

  orders_product:CartItem[]=new Array<CartItem>();

  constructor(public orderService:OrderService){};

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrders().subscribe(data=>this.orders_product=data.
    
    )
  }
}
