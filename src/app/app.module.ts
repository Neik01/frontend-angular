import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import localeVi from '@angular/common/locales/vi';
import { registerLocaleData } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalLoginComponent } from './components/modals/login/modal-login/modal-login.component';
import { ModalRegistrationComponent } from './components/modals/registration/modal-registration/modal-registration.component';
import { LoginStateModalComponent } from './components/modals/loginState/login-state-modal/login-state-modal.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { HTTP_INTERCEPTORS} from '@angular/common/http';   
import { HttpRequestInterceptor } from './interceptors/intercept-credentials.service';


registerLocaleData(localeVi);

function tokenGetter(){
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    SearchComponent,
    ProductListComponent,
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent,
    FooterComponent,
    ModalLoginComponent,
    ModalRegistrationComponent,
    LoginStateModalComponent,
    OrderHistoryComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:tokenGetter,
        allowedDomains:['localhost:8080','localhost:4200'],
        disallowedRoutes:[]
      }
    }),
    ModalModule.forRoot()
  ],
  providers: [
    AppRoutingModule,
    {
      provide: LOCALE_ID,
      useValue: 'vi-VN' 
    }
    ,
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
