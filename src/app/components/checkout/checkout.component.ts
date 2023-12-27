import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  orderInfoForm= this.fb.group({
    name: [''],
    address:[''],
    phone:['']
  })

  constructor(private fb:FormBuilder,
              private orderService:OrderService){

  }

  ngOnInit(): void {
    
  }

  onFormSubmit(){
    
    this.orderService.sendOrder(this.orderInfoForm.value).subscribe(res=>{
      console.log('Gui thanh cong');
      console.log(res);
      
    })
  }
}
