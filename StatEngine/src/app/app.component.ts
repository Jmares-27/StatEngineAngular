import { Component } from '@angular/core';
import { HttpService } from './_services/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StatEngine';
  opened = true;

  constructor(private http:HttpService, private router: Router, private snackBar: MatSnackBar, private matIconRegistry:MatIconRegistry, private domSanitizer:DomSanitizer){
    this.matIconRegistry.addSvgIcon('discord',this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/discord-icon-svgrepo-com.svg'))
  }
  homeRedirect(){
    this.router.navigate(['home']);
    this.menuToggle();
    
    
  }

  registerRedirect(){
    this.router.navigate(['register']);
    this.menuToggle();
  }

  loginRedirect(){
    this.router.navigate(['login']);
    this.menuToggle();

  }

  myAccountRedirect(){
    this.router.navigate(['myaccount']);
    this.menuToggle();

  }
  
  searchRedirect(){
    this.router.navigate(['search'])
    this.menuToggle();

  }

  logoutRedirect(){
    this.http.logOut();
    this.snackBar.open("Logging out! Redirecting...","",{duration: 2000});
    this.router.navigate(["home"]);
    this.menuToggle();

  }
  
  deleteAccountRedirect(){
    this.router.navigate(['deleteAccount'])
  }

  menuToggle():boolean{
    this.opened=!this.opened
    return this.opened
  }


}
