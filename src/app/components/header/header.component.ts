import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/authEmitter';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalLoginComponent } from '../modals/login/modal-login/modal-login.component';
import { LoginStateModalComponent } from '../modals/loginState/login-state-modal/login-state-modal.component';
import { ModalRegistrationComponent } from '../modals/registration/modal-registration/modal-registration.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  modalRef?: BsModalRef;

  isAuthenticated:boolean=false;

  constructor(
    public router:Router,
    public modalService:BsModalService 
    ){

  }

  ngOnInit(): void {
    
    Emitters.authEmitter.subscribe(value=>this.isAuthenticated=value)

    const token=localStorage.getItem('token');
    if(token){
      this.isAuthenticated=true
    }
  }

  logout() {
    localStorage.removeItem('token');
    Emitters.authEmitter.emit(false);
    alert("Đăng xuất thành công");
    this.router.navigateByUrl('/');
  }

  showLoginModal(){
    this.modalRef=this.modalService.show(ModalLoginComponent);
    
  }

  showRegisModal(){
    this.modalRef=this.modalService.show(ModalRegistrationComponent);
  }

  showOrderHistory(){
    this.router.navigateByUrl('/order-history')
  }
}
