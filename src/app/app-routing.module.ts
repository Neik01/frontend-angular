import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { authGuard } from './guards/auth.guard';
import { OrderHistoryComponent } from './components/order-history/order-history.component';


const productsMatcher = (segments: UrlSegment[]): UrlMatchResult => {
  const paths= ['lap','kb','chu','man']
  if (segments.length >= 1 && paths.includes(segments[0].path)) {
    return {
      consumed: segments,
      posParams: {
        category : segments[0]
      }
    }
  }
  return <UrlMatchResult>(null as any);
}

const routes: Routes = [

  { matcher: productsMatcher, component: ProductListComponent},
  { path:'order-history',component:OrderHistoryComponent},
  { path:'search/:keyword',component:ProductListComponent},
  { path:'checkout',component:CheckoutComponent,canActivate:[authGuard]},
  { path:'cart',component:CartComponent,canActivate:[authGuard]},
  { path: 'product/:id',component: ProductDetailComponent},
  { path:'',component:ProductListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
