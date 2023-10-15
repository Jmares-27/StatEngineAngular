import { Component } from '@angular/core';
import { HttpService } from './_services/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SearchService } from './_services/search.service';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { User } from './models/user.model';
import { UserService } from './_services/user.service';
import { MatAutocomplete } from '@angular/material/autocomplete';
// import { UserService } from './user/user.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StatEngine';
  opened: boolean = true;
  isDisplayed: boolean = false;
  displayRegAndLogin: boolean  = false;
  public SearchForm: FormGroup;

  searchString: string =  "";
  showSuggestions: boolean = false;
  suggestions: any = [];
  constructor(private UserService:UserService, private searchService:SearchService, private formBuilder:FormBuilder,private http:HttpService, private router: Router, private snackBar: MatSnackBar){
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

    this.searchService.searchUser(this.searchString).subscribe((data: any) => { 
        if (data == "No user exist!" ) {
          // console.log("inside no data") //used for testing
          // this.status_checker = true
          console.log ("There is no such player exist")
          // console.log ("data", data)
          this.searchService.message = "There is no such player exist"
          this.searchService.display_user = true
          
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
          this.searchService.message = "User found!"
          this.searchService.display_user = true
        }
      },
      error => console.log(error)
    )
    
  }


  onSearchInput() {
    this.searchString = this.SearchForm.value.username
    if (this.searchString.length >= 3) {
      this.searchService.getSuggestions(this.searchString).subscribe(
        (data) => {
          if (data == undefined){

          }
          else{          

            // this.suggestions = Object.values(data);
            // this.suggestions.push(data);
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
    this.searchService.userID = selectedSuggestion["_id"]
    // console.log ("selected userID", this.searchService.userID)
    this.http.getStats(this.searchService.userID).subscribe((data)=>{

      
      var body = JSON.parse(JSON.stringify(data))
      console.log("body", body)
      var last_match = body["last_match"]
      var overall = body["overall"]
      this.UserService.userName = body["username"]
      this.UserService.lm_result = last_match["last_match_result"]
      this.UserService.lm_kd = Math.round(parseFloat(last_match["last_match_kd"])*100)/100
      this.UserService.lm_adr = Math.round(parseFloat(last_match["last_match_adr"])*100)/100
      this.UserService.oa_kd = Math.round(parseFloat(overall["overall_kd"])*100)/100
      this.UserService.oa_adr = Math.round(parseFloat(overall["overall_adr"])*100)/100
      this.UserService.oa_hsp = Math.round(parseFloat(overall["overall_hsp"])*10000)/100

      let results = document.getElementById("winloss")
      if (this.UserService.lm_result == "Win"){
        results.style.color = "green"
      }
      else{
        results.style.color = "red"
      }

      let lm_kd = document.getElementById("lm_kd")
      if (this.UserService.lm_kd > 1){
        lm_kd.style.color = "green"
      }
      else{
        lm_kd.style.color = "red"
      }

      let oa_kd = document.getElementById("oa_kd")
      if (this.UserService.oa_kd > 1){
        oa_kd.style.color = "green"
      }
      else{
        oa_kd.style.color = "red"
      }

      let oa_adr = document.getElementById("oa_adr")
      if (this.UserService.oa_adr > 80){
        oa_adr.style.color = "green"
      }
      else{
        oa_adr.style.color = "red"
      }

      let oa_hsp = document.getElementById("oa_hsp")
      if (this.UserService.oa_hsp > 30){
        oa_hsp.style.color = "green"
      }
      else{
        oa_hsp.style.color = "red"
      }

      let lm_adr = document.getElementById("lm_adr")
      if (this.UserService.lm_adr > 80){
        lm_adr.style.color = "green"
      }
      else{
        lm_adr.style.color = "red"
      }
    },
    (error) => {
      if (error.status === 500) {
        // Handle the 500 error
        console.error('Server error (500):', error.error);
        // You can also display an error message to the user
      } else {
        // Handle other errors
        console.error('Error:', error);
      }
    })
    this.router.navigate(['user', this.searchService.userID])
    this.SearchForm.reset()
    this.suggestions = []
   
    // this.refreshUserPage()
    //call my account http.request
    // this.menuToggle()
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
