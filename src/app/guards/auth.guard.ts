import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Emitters } from '../emitters/authEmitter';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalLoginComponent } from '../components/modals/login/modal-login/modal-login.component';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const jwtHelper=inject(JwtHelperService);

  const modalService=inject(BsModalService);
  

  if(token||!jwtHelper.isTokenExpired(token)){
    console.log('true');
    Emitters.authEmitter.emit(true);
    return true
  }

  const modalRef:BsModalRef=modalService.show(ModalLoginComponent);
  console.log("false");
  Emitters.authEmitter.emit(false);
  return false;
};
