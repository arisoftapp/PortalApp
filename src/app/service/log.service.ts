import { Injectable } from '@angular/core';
import { Global } from './global';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogService {
  token: any;
  constructor(private _http : Http) { }

  logUser(usuario, token = null){
    //console.log("Usuario:", usuario);
    //console.log(this.global.Admin_URL);
    //
    let URL = 'http://201.107.4.152:3006/'+ 'log';
    const params = JSON.stringify(usuario);
    const headers = new Headers(
      {
        'Content-Type' : 'application/json'
      }
    ); 
    
    return this._http.post(URL, params, {headers}).pipe( 
      res =>{
      return res;
    })
  }

  getToken(){
    let token = JSON.parse(localStorage.getItem('tok'));
    if (this.token != "undefined"){
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }
}
