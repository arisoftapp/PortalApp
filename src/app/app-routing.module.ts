import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { InicoComponent} from './inico/inico.component'
import { AuthService } from './service/auth.service';

const routes: Routes = [
  { path : '', children: [
    { path : 'inicio', component :  InicoComponent , canActivate: [AuthService]},
    { path : 'logIn', component : LoginComponent },
    { path: '**', component: LoginComponent}
  ]},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
