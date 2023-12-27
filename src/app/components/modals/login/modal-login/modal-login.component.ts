import { Component, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Emitters } from 'src/app/emitters/authEmitter';
import { AuthService } from 'src/app/services/auth.service';
import { LoginStateModalComponent } from '../../loginState/login-state-modal/login-state-modal.component';
import { ModalRegistrationComponent } from '../../registration/modal-registration/modal-registration.component';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent {


  regisModalRef?:BsModalRef;
  loginForm= this.fb.group({
    email: [''],
    password:['']
  })
  ;
  constructor(public fb:FormBuilder,
    public authService: AuthService,
    public modalService:BsModalService,
    public modalRef:BsModalRef
    ){        
  }


  submitFormLogin(){
    this.authService.handleLogin(this.loginForm.value).subscribe( {
      next:(res:any)=>{
        
        localStorage.setItem('token',res.body)
        console.log(res);
        Emitters.authEmitter.emit(true);
        this.close();
        alert('Đăng nhập thành công')
      },
      error:(err: any)=>{
        console.log(err);
        Emitters.authEmitter.emit(false)
      }
      
    })
  }

  getUser(){
    this.authService.getUser().subscribe({
      next:(res: any) => {
        
        Emitters.authEmitter.emit(true);
        console.log(res)
      },
      error:(err: any)=>{
        console.log(err);
        
       
        
      }
    }  )
  }

 close(){
  this.modalRef.hide(); 
 }


 openRegisModal(){
    this.regisModalRef=this.modalService.show(ModalRegistrationComponent);
    this.close()
 }
}
