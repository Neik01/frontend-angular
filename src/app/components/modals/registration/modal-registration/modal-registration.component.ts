import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Emitters } from 'src/app/emitters/authEmitter';
import { AuthService } from 'src/app/services/auth.service';
import { ModalLoginComponent } from '../../login/modal-login/modal-login.component';

@Component({
  selector: 'app-modal-registration',
  templateUrl: './modal-registration.component.html',
  styleUrls: ['./modal-registration.component.css']
})
export class ModalRegistrationComponent {

  modalRef2?:BsModalRef

  regisForm= this.fb.group({
    email: [''],
    username:[''],
    password:[''],
    confirmPassword:['']
  });


  constructor(public fb:FormBuilder,
    public authService: AuthService,
    public modalService:BsModalService,
    public modalRef:BsModalRef
    ){        
  }


  submitFormRegis() {
 
    this.authService.handleRegis(this.regisForm.value).subscribe( {
      next:(res:any)=>{
        console.log(res);
       
        alert('Đăng ký thành công');
        this.openLoginModal();
      },
      error:(err: any)=>{
        console.log(err);
        alert(err.error['message'])
      }      
    })
  }
  
  openLoginModal() {
    
    this.modalRef2=this.modalService.show(ModalLoginComponent);
    this.close();
  };

  close(){
    this.modalRef.hide();
    
  }
}
