import { Product } from "src/app/model/product";
import { server_url } from "../constants/url";

export function handleImgLinksInArray(proArr:Array<Product>){
    proArr.forEach(product => {
        product = handleImgLinks(product)
      })
    return proArr
}

export function handleImgLinks(pro:Product){
    pro.imgLinks.forEach((link,index)=>{
        pro.imgLinks[index]=`${server_url}/${link}`
    })
    return pro    
}