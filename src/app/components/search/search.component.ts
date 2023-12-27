import { Component } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(public router:Router){}

  doSearch(keyword:string){
     this.router.navigateByUrl('/search/'+keyword)
  }
}
