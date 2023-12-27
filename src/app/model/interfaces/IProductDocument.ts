import { Product } from "../product";

export interface productDocument{
    docs:Array<Product>,
    totalDocs:number,
    limit:number,
    totalPages:number,
    page:number,
    pagingCounter:number,
    hasPrevPage:boolean,
    hasNextPage:boolean,
    prevPage:number,
    nextPage:number
  }