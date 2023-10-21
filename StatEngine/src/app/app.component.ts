import { Component } from '@angular/core';
import { HttpService } from './_services/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SearchService } from './_services/search.service';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { User } from './models/user.model';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { AuthGuard } from './_services/authGuard';
// import { UserService } from './user/user.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StatEngine';
  opened: boolean = true;
  // isDisplayed: boolean = false;
  // displayRegAndLogin: boolean  = false;
  hasLoggedIn :boolean = false;
  public SearchForm: FormGroup;

  searchString: string =  "";
  showSuggestions: boolean = false;
  suggestions: any = [];
  constructor(private authGuard:AuthGuard, private searchService:SearchService, private formBuilder:FormBuilder,private http:HttpService, private router: Router, private snackBar: MatSnackBar){
    if (this.checkAuthenication() == true) {
      this.hasLoggedIn = true;
    }else {
      this.hasLoggedIn = false;
    }



    this.SearchForm = this.formBuilder.group({
      username:['',[Validators.required]],
    });

  }




  onSearchInput() {
    this.searchString = this.SearchForm.value.username
    if (this.searchString.length >= 3) {
      this.searchService.getSuggestions(this.searchString).subscribe(
        (data) => {
          if (data == undefined){

          }
          else{          
            this.suggestions = data["users"]
            this.showSuggestions = true;
            // console.log ("suggestion data: ", this.suggestions)
            // console.log ("data received", data["users"])
          }

        },
        (error) => {
          console.error('Error getting suggestions:', error);
        }
      );
    } else {
      this.showSuggestions = false;
    }
  }

  homeRedirect(){
    this.router.navigate(['home']);
    this.menuToggle();
  }

  userPageRedirect(selectedSuggestion){
    this.router.navigate(['user', selectedSuggestion["_id"]])
    this.SearchForm.reset()
    this.suggestions = []
  }

  registerRedirect(){
    this.router.navigate(['register']);
    this.menuToggle();
  }

  loginRedirect(){
    this.router.navigate(['login']);
    this.menuToggle();

  }


  resetPasswordRedirect(){
    this.router.navigate(['passwordreset']);
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

  // canDisplayed(){
  //   // this.http.isDisplayed = true;
  //   // this.isDisplayed = true;
  //   this.hasLoggedIn = true
  // }

  logoutRedirect(){
    this.http.logOut();
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