import { Component, OnInit } from '@angular/core';
import { User } from '../models/userModels';
import { LogService } from '../service/log.service';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: User;
  public Login : any;
  public Resp : any;
  public Success : boolean = true;
  public Message : string;
  public identity;
  public texto;
  public jey;
  public hola;
  public into;
  constructor(private auth_serv: AuthService, private router : Router,private service: LogService, ) { 
    
    this.usuario= new User();
  }

  ngOnInit() {
    let token = this.auth_serv. canActivate();
    console.log(token);
    if(token == true){
      this.router.navigate(['/inicio']);
    }else{
      this.router.navigate(['/logIn']);
    }
  }

  logIn(){
    console.log(this.usuario);
    this.service.logUser(this.usuario).subscribe(response => {
      this.Resp = response;
      this.texto = this.Resp._body;
      this.jey = JSON.parse(this.texto);
      this.Success = this.jey.success;
      this.Message = this.jey.message;
      this.hola = this.jey.hola;
      
      if (this.Success){
        console.log(this.jey)
        
        localStorage.setItem('into', JSON.stringify(this.Success));
        localStorage.setItem('tok', JSON.stringify(this.jey.token));
        this.router.navigate(['/inicio']);
        location.reload();
       
      }

    })
  } catch(error){
    console.log('Error de logueo');
  }
  }

 



