import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName} from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { Router } from '@angular/router';
import { user } from '../user';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm;
  constructor(private formBuilder: FormBuilder, private http: HttpService, private router: Router, public snackBar: MatSnackBar){
    this.loginForm = this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }


  onClickToSignUp(){
    this.router.navigate(['register']);
  }

  async onLogin(){
    var newUser = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    }
    await this.http.checkUser(newUser).subscribe(
      data=>{
        var dataString = JSON.stringify(data);
        var dataJson = JSON.parse(dataString);
        localStorage.setItem("token", dataJson["token"]);
      },
      error => console.log(error)
    )
    console.log(localStorage.getItem("token"))
    if (localStorage.getItem("token")==undefined){
      this.loginForm.reset(this.loginForm.value);
      this.snackBar.open("Login Unsuccessful! Please Try Again.","X", {duration: 2000})
    } else if (localStorage.getItem("token")==null){
      this.snackBar.open("Login Success!","",{duration:2000});
      this.router.navigate(["myaccount"]);
    }
    else{
      this.snackBar.open("Login Success!","",{duration:2000});
      this.router.navigate(["myaccount"]);
    }
  }

  async onLogin2() {
    var newUser = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    }
    // console.log ("login form data", newUser)
    this.http.checkUser(newUser).subscribe(
      data=>{
        // console.log("HERE -->", data);
        if (data == "No user exist!" ) {
          // console.log("inside no data") //used for testing

          console.log ("There is no such player exist")
          this.loginForm.reset(this.loginForm.value);
          this.snackBar.open("Login Unsuccessful! Please Try Again.","X", {duration: 2000})
        }
        else{
          //datafound?
          var dataString = JSON.stringify(data);
          var dataJson = JSON.parse(dataString);
          const userdata = {
            username: dataJson.data.username,
            email: dataJson.data.email,
            password: dataJson.data.password,
            steamID: dataJson.data.steamID,
            token: dataJson.data.token
          };
          // console.log (userdata)
          const userdataString = JSON.stringify(userdata);
          // console.log (userdataString);
          // const userdataToken = JSON.stringify(dataJson.token);
          // localStorage.setItem("token", dataJson.token);
          
          localStorage.setItem("userData", userdataString);
          // console.log("user data-->", dataJson.data.username)

          // console.log ("local Storage is :", localStorage.getItem("token"));

          if (this.http.getAuthentication()){
            this.snackBar.open("Login Success!","",{duration:2000});
            this.router.navigate(["search"]);

          } else {
            this.loginForm.reset(this.loginForm.value);
            this.snackBar.open("Login Unsuccessful! Please Try Again.","X", {duration: 2000})
          }
        }
      },
      error => console.log(error)
    )
  }


  goToPassReset(){
    this.router.navigate(["passwordreset"]);
  }
}
