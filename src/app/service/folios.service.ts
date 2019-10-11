import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoliosService {
  token: any;
  globalurl: any='http://localhost:3006/';//'http://wsar.homelinux.com:3006/';

  constructor(private _http: Http, private log_serv: LogService) { }

  getFolios(){
    this.token = this.log_serv.getToken();
    console.log(this.token);
    
    let URL = 'http://localhost:3006/'+ 'folios/'//'http://wsar.homelinux.com:3006/' + 'folios/';
    const headers = new Headers(
      {
        'Content-Type' : 'application/json',
        'x-access-token' : this.token,
      }
    );

    return this._http.get(
      URL, {headers}).pipe(
        res => {
          res => res.json();
          return res;
        }
      )
  }

  getDetalles(id){
    this.token = this.log_serv.getToken();
    console.log(this.token);
    
    let URL = this.globalurl + 'detalles/' + id;
    const headers = new Headers(
      {
        'Content-Type' : 'application/json',
        'x-access-token' : this.token,
      }
    );

    return this._http.get(
      URL, {headers}).pipe(
        res => {
          res => res.json();
          return res;
        }
      )
  }

  putStatus(data: any) {
   
    let URL = this.globalurl + 'comentario';
    const newpres = JSON.stringify(data);
    const headers = new Headers(
      {
        'Content-Type' : 'application/json',
        'x-access-token' : this.token,
      }
    );

    return this._http.put(
      URL, newpres, {headers}).pipe(
        res => {
          res => res.json();
          
          return res;
        }
      )

  }
}
