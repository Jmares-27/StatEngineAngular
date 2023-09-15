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
  isDisplayed = false;
  displayRegAndLogin  = false;
  constructor(private http:HttpService, private router: Router, private snackBar: MatSnackBar, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
    if (this.checkAuthenication() == true) {
      this.isDisplayed = true;
      this.displayRegAndLogin = false;
    }else {
      this.isDisplayed = false;
      this.displayRegAndLogin = true;
    }
    this.matIconRegistry.addSvgIcon('discord',this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/discord-icon-svgrepo-com.svg'))
    this.matIconRegistry.addSvgIcon('instagram',this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/instagram-svgrepo-com.svg'))
    this.matIconRegistry.addSvgIcon('facebook',this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/facebook-svgrepo-com.svg')) 
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

  checkAuthenication() {
    if (this.http.getAuthentication() ==  null) {
      return false;
    }
    else {
      return true;
    }
  }
  canDisplayed(){
    this.isDisplayed = true;
  }

  logoutRedirect(){
    this.http.logOut();
    this.isDisplayed = false;
    this.displayRegAndLogin = true;
    this.snackBar.open("Logging out! Redirecting...","",{duration: 2000});
    this.router.navigate(["home"]);
    this.menuToggle();
  }
  
  deleteAccountRedirect(){
    this.router.navigate(['deleteaccount'])
  }

  menuToggle():boolean{
    this.opened=!this.opened
    return this.opened
  }

  bugReportRedirect(){
    this.router.navigate(['bugreport'])
    this.menuToggle();
  }
}
