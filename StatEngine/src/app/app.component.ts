import { Component } from '@angular/core';
import { HttpService } from './_services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StatEngine';
  opened = true;

  constructor(private http:HttpService, private router: Router){}
  homeRedirect(){
    this.router.navigate(['home']);
  }

  registerRedirect(){
    this.router.navigate(['register']);
  }

  loginRedirect(){
    this.router.navigate(['login']);
  }

  searchRedirect(){
    this.router.navigate(['search'])
  }

  menuToggle():boolean{
    this.opened=!this.opened
    return this.opened
  }


}
