import { Component, OnInit } from '@angular/core';
import { FoliosService } from '../service/folios.service';
import { Folio } from '../models/folioModel';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-inico',
  templateUrl: './inico.component.html',
  styleUrls: ['./inico.component.css']
})
export class InicoComponent implements OnInit {
  private success : boolean;
  folios: any [] = [];
  almacenes: any [] = [];
  respaldo: any[];
  detalels: any[];
  folio: any;
  comentario;

  flt_prev: any;
  fecha_prev: any;
  almacen: any;
  proveedor: any;
  empresa: any;
  act_folio: boolean = true;
  act_fecha: boolean=true;
  act_almacen: boolean= true;
  act_proveedor: boolean= true;
  constructor(private router : Router, private auth_serv: AuthService, private folio_serv: FoliosService) {
    let token = this.auth_serv. canActivate();
    this.empresa = JSON.parse(localStorage.getItem('empresa'));

    if(token == true){
      //this.router.navigate(['/inicio']);
    }else{
      this.router.navigate(['/logIn']);
      window.location.reload();
    }
   }

  ngOnInit() {
    this.getFolios();
    this.getAlmacen();
  }

  getFolios(){
   
    this.folio_serv.getFolios().subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (!jey.success){
          this.success = jey.success; 
          
        }else {
          this.folios = jey.data.filter(folio =>  folio.id_empresa == this.empresa );
          this.folios = this.eliminarObjetosDuplicados(this.folios, 'folio_previo');
          this.respaldo = this.folios

        }
      error => {
        console.log(<any>error);
      }
    });;
  }

  eliminarObjetosDuplicados(arr, prop) {
    var nuevoArray = [];
    var lookup  = {};
    for (var i in arr) {
        lookup[arr[i][prop]] = arr[i];
    }

    for (i in lookup) {
        nuevoArray.push(lookup[i]);
    }

    return nuevoArray;
  }

  detalles(folio: any){
    this.folio = folio;
    this.detalels =[];
    this.comentario = this.folio.comentario_in;
    
    this.folio_serv.getDetalles(this.folio.folio_oc).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (!jey.success){
          this.success = jey.success; 
        }else {
          this.detalels = jey.data
          console.log(this.detalels);
         
        }
      error => {
        console.log(<any>error);
      }
      });;
  }

  getAlmacen(){
    this.folio_serv.getAlmacen(1).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (!jey.success){
          this.success = jey.success; 
        }else {
          this.almacenes = jey.data;
          console.log(jey.data);
         
        }
      error => {
        console.log(<any>error);
      }
      });;
  }

  setComentario(){
    this.folio.comentario = this.comentario;
    
     this.folio_serv.putStatus(this.folio).subscribe(
       (response : any)  => {
         var Resp = response;
         var texto = Resp._body;
         var jey = JSON.parse(texto);
         this.success = jey.success;
       
         if (jey.success){
           
            this.ngOnInit();
         }
     });
    
  }

  filtrar(){
    if(this.flt_prev != "" && this.flt_prev != undefined){
      this.folios = this.respaldo.filter(folio => folio.folio_previo == this.flt_prev );
    }else if (this.fecha_prev != "" && this.fecha_prev != undefined){
      this.folios = this.respaldo.filter(folio => folio.fecha_previo.substring(0, 10) == this.fecha_prev);
    }else if(this.almacen != "" && this.almacen != undefined){
      this.folios = this.respaldo.filter(folio => folio.almacen == this.almacen );
    }
    else if(this.proveedor != "" && this.proveedor != undefined){
      this.folios = this.respaldo.filter(folio => folio.proveedor == this.proveedor);
    }else{
      this.folios = this.respaldo;
    }
  }

  cambio(id){
    if(id == 1){
     // this.almacen = "";
      this.proveedor = "";
      this.fecha_prev ="";
      //this.act_almacen = false;
      this.act_proveedor = false;
      this.act_fecha = false;
    }else if (id == 2){
      //this.almacen = "";
      this.flt_prev ="";
      this.proveedor = "";
      //this.act_almacen = false;
      this.act_proveedor = false;
      this.act_folio = false;

    }/*else if(id == 3){
      this.flt_prev = "";
      this.proveedor = "";
      this.fecha_prev ="";
      this.act_folio = false;
      this.act_proveedor = false;
      this.act_fecha = false;
    }*/
    else if(id == 4){
     // this.almacen = "";
      this.flt_prev = "";
      this.fecha_prev ="";
      //this.act_almacen = false;
      this.act_folio = false;
      this.act_fecha = false;
    }
    if( this.almacen == "" && this.flt_prev == ""&& this.fecha_prev =="" && this.proveedor ==""){
      //this.act_almacen = true;
      this.act_folio = true;
      this.act_fecha = true;
      this.act_proveedor = true;
      this.getFolios();
    }
  }

  cerrar(){
    localStorage.clear();
    this.router.navigate(['']);
    window.location.reload();
  }

  comentar(folio: any){
    this.comentario="";
    this.folio = folio;
    this.comentario = this.folio.comentario;
  }
}
