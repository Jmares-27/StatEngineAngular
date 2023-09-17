import { Component } from '@angular/core';
import { HttpService } from './_services/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { SearchComponent } from './search/search.component';
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
  searchString = ""
  public SearchForm: FormGroup;

  constructor( private formBuilder:FormBuilder,private http:HttpService, private router: Router, private snackBar: MatSnackBar){
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

    this.http.searchUser(this.searchString ).subscribe(
      data=>{
        // console.log("HERE -->", data);
        if (data == "No user exist!" ) {
          // console.log("inside no data") //used for testing
          // this.status_checker = true
          console.log ("There is no such player exist")
          localStorage.setItem("searchResult", "There is no such player exist" )
          // this.searchComponent.message = "There is no such player exist"
          this.router.navigate(['search'])
              
          // this.message = "There is no such player exist"
          // location.reload();
        }
        else{
          //datafound
          console.log("user data-->", data)
          var dataString = JSON.stringify(data);
          var dataJson = JSON.parse(dataString);
          const userdata = {
            username: dataJson.data.username,
            email: dataJson.data.email,
            password: dataJson.data.password,
            steamID: dataJson.data.steamID,
          };

          const userdataString = JSON.stringify(userdata);
          localStorage.setItem("searchResult", userdataString)
          // this.searchComponent.message = "User found!"
          this.router.navigate(['search'])
          // location.reload();
          // this.status_checker = true
          // this.message = "User found!"
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

  viewFriendListRedirect(){
    this.router.navigate(['viewfriendlist'])
    this.menuToggle();
  }
}
