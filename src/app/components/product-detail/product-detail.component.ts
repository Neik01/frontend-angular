import { JsonPipe } from '@angular/common';
import { Component, OnInit,ViewChild , ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/model/cart-item';
import { Product } from 'src/app/model/product';
import { OrderService } from 'src/app/services/order.service';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  @ViewChild('small-img-col') small_img_col: ElementRef | undefined;

  product:Product

  constructor(public route: ActivatedRoute,
              public productService:ProductService,
              public router: Router,
              public orderService:OrderService
              ){

                this.product=new Product
              
              
  }

  ngOnInit(): void {
    this.getProductData();
  }

  getProductData() {
    const proId= this.route.snapshot.url[1].path
    this.productService.getProductById(proId).subscribe(data => {
      this.product=data
    })
    
    
  }

  returnZero(){
    return 0;
  }

  btnBuyClick(){
    let cartItem=new CartItem(this.product)
    this.orderService.addToCart(cartItem)
  }

  changeImage(imgLink:string){
    document.getElementById("main-img")?.setAttribute('src',imgLink)
  }

  leftArrowClick(){
    this.small_img_col!.nativeElement.scrollLeft -= 160;
  }

  rightArrowClick(){
    this.small_img_col!.nativeElement.scrollLeft += 150;
  }
}
