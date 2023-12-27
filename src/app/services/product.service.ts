import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { handleImgLinks, handleImgLinksInArray } from '../utils/helpers/handleImageLinks';
import { api_url,server_url } from '../utils/constants/url';
import { Product } from '../model/product';
import { productDocument } from '../model/interfaces/IProductDocument';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  product_url= api_url +'/product'

  constructor(public httpClient:HttpClient) { }


  getAllProduct(pageIndex:number):Observable<productDocument>{

    return this.httpClient.get<productDocument>(this.product_url+'/getAllProduct/'+pageIndex).pipe(map(document=>{
      
      document.docs=handleImgLinksInArray(document.docs)
      
      return document
    }))
                          
  }

  getProductByCategory(category:String,page:number){
    return this.httpClient.get<productDocument>(`${this.product_url}/getProductByCategory/${category}/${page}`).pipe(map(document=>{
      
      document.docs=handleImgLinksInArray(document.docs)
      
      return document
    }))
  }

  getProductById(id:string){
    return this.httpClient.get<Product>(`${this.product_url}/getProductById/${id}`).pipe(map(product =>handleImgLinks(product)))
  }
  
  searchProduct(keyword:string){
    const searchLink=this.product_url+'/findProductByName/'+keyword;
    return this.httpClient.get<Product[]>(searchLink).pipe(map(data=>handleImgLinksInArray(data)))
  }
}

// interface productDocument{
//   docs:[Product],
//   totalDocs:number,
//   limit:number,
//   totalPages:number,
//   page:number,
//   pagingCounter:number,
//   hasPrevPage:boolean,
//   hasNextPage:boolean,
//   prevPage:number,
//   nextPage:number
// }