import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { api_url } from 'src/app/utils/constants/url';
import { productDocument } from 'src/app/model/interfaces/IProductDocument';
import {PaginationInstance} from 'ngx-pagination';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  

})
export class ProductListComponent implements OnInit{


  dataDocument:productDocument | undefined;
  data :Product[];
 
  previousCategory:string='';

  totalProducts:number=0
  public config: PaginationInstance = {
    itemsPerPage: 12,
    currentPage: 1,
    totalItems:this.totalProducts
  };

  public labels: any = {
    previousLabel: 'Trang trước',
    nextLabel: 'Trang sau',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `Bạn đang ở trang`
  };
  constructor(public productService:ProductService,
              public route:ActivatedRoute ){
    this.data=[]
    
  }

  ngOnInit(): void {
    
    this.getData(1);
    
  }

  getData(page:number){
    try {
      this.route.url.subscribe(urlSegment=>{
        if(urlSegment.length===0)  this.getAllProduct(page)
        else{
          if(urlSegment[0].toString()==='search') {
            this.getSearchData(urlSegment[1].toString())
          }
          else{
            this.getProductByCategory(urlSegment,page);
          }
        }
      })
    } catch (error) {
      console.log(error);
      
    }
  }


  getAllProduct(pageIndex:number) {
    this.productService.getAllProduct(pageIndex).subscribe(data => {
      this.dataDocument=data
      this.config.totalItems=this.dataDocument.totalDocs
      this.data=this.dataDocument.docs
      console.log(this.dataDocument);
    })
    
     
  }

  getSearchData(keyword: string) {
    this.productService.searchProduct(keyword).subscribe(data=>this.data=data)
  }


  getProductByCategory(urlSegment:UrlSegment[],page:number) {
    this.productService.getProductByCategory(urlSegment[0].path,page).subscribe(data => {
      this.dataDocument=data
      if(this.previousCategory!=urlSegment[0].path){
        this.config.currentPage=1
        this.previousCategory=urlSegment[0].path
      }
      this.config.totalItems=this.dataDocument.totalDocs
      this.data=this.dataDocument.docs
      console.log(this.dataDocument);
      
    })  
          
  }

  onPageChange(number: number) {
    this.config.currentPage=number
    
    this.getData(number)
  }
}

