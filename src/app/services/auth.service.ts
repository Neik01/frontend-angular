import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_url } from '../utils/constants/url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth_url=api_url+'/auth'

  constructor(public httpClient:HttpClient) { }

  handleLogin(loginForm:any){
    
    const params = new HttpParams({fromObject:loginForm})
                  
    
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
        withCredentials:true,
        observe:'response' as 'body'
    };

    return this.httpClient.post(this.auth_url+'/login',params.toString(),options)

    
  }

  getUser(){
    const options={
      // headers:new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`),
      withCredentials:true
    }
    return  this.httpClient.get(this.auth_url+'/user',options)
  }


  handleRegis(regisForm:any){
    const params = new HttpParams({fromObject:regisForm})
                  
    
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
        withCredentials:true,
        observe:'response' as 'body'
    };
    console.log(regisForm);
    
    return this.httpClient.post(this.auth_url+'/registration',params.toString(),options)

  }
}
