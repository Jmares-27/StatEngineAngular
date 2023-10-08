import { Component } from '@angular/core';
import { HttpService } from './_services/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SearchService } from './_services/search.service';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { User } from './models/user.model';

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
  public SearchForm: FormGroup;
  searchString: "";


  constructor( private searchServ:SearchService, private formBuilder:FormBuilder,private http:HttpService, private router: Router, private snackBar: MatSnackBar){
    if (this.checkAuthenication() == true) {
      this.isDisplayed = true;
      this.displayRegAndLogin = false;
    }else {
      this.isDisplayed = false;
      this.displayRegAndLogin = true;
    }

    this.SearchForm = this.formBuilder.group({
      username:['',[Validators.required]],
    });

  }


  searchSubmit(){
    

    this.searchString = this.SearchForm.value.username
    // console.log(this.searchString); //USED FOR TESTING

    this.searchServ.searchUser(this.searchString).subscribe((data: any) => { 
        if (data == "No user exist!" ) {
          // console.log("inside no data") //used for testing
          // this.status_checker = true
          console.log ("There is no such player exist")
          // console.log ("data", data)
          this.searchServ.message = "There is no such player exist"
          this.searchServ.display_user = true
          
          // localStorage.setItem("searchResult", "There is no such player exist" )
          // this.searchComponent.message = "There is no such player exist"
          this.router.navigate(['search'])
              

          // window.location.reload();
        }
        else{
          //datafound
          // console.log("user data-->", data)

          const user: User = data;
          // console.log("user data-->", user)
          localStorage.setItem("searchResult", JSON.stringify(user))
          // this.searchComponent.message = "User found!"

          this.router.navigate(['search'])


          // window.location.reload();
          // this.status_checker = true
          this.searchServ.message = "User found!"
          this.searchServ.display_user = true
        }
      },
      error => console.log(error)
    )
    
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

  bugReportSuccessRedirect(){
    this.router.navigate(['bugreportsuccess'])
    this.menuToggle();
  }

  favoritesRedirect(){
    this.router.navigate(['favorites'])
    this.menuToggle();
  }
}
