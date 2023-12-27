import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { Emitters } from 'src/app/emitters/authEmitter';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent {

  @ViewChild('modalLogin') modalLogin!:ElementRef
  @ViewChild('modalRegis') modalRegis!:ElementRef


  loginForm= this.fb.group({
    email: [''],
    password:['']
  })

  constructor(public fb:FormBuilder,
              public authService:AuthService,
              public renderer:Renderer2){  
    
                 
  }

  openLoginModal(){
    this.renderer.selectRootElement(this.modalLogin.nativeElement).modal('show')
   
  }



  submitFormLogin(){
    this.authService.handleLogin(this.loginForm.value).subscribe( {
      next:(res)=>{
        localStorage.setItem('token',res.toString())
        console.log("Token: "+localStorage.getItem('token'));
        
        this.getUser()
      },
      error:(err)=>{
        console.log(err);
        
      }
      
    })
  }

  getUser(){
    this.authService.getUser().subscribe({
      next:(res) => {
        
        Emitters.authEmitter.emit(true)
       
          
        document.getElementById("btn-close")!.click()
        console.log(res)
      },
      error:(err)=>{
        console.log(err);
        
       
        Emitters.authEmitter.emit(false)
      }
    }  )
  }

  log(){
    console.log(this.modalLogin);
    
  }
}
