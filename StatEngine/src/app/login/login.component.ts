import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName} from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { Router } from '@angular/router';
import { user } from '../user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm;
  constructor(private appComponent:AppComponent, private formBuilder: FormBuilder, private http: HttpService, private router: Router, public snackBar: MatSnackBar){
    this.loginForm = this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }


  onClickToSignUp(){
    this.router.navigate(['register']);
  }



  onLogin() {
    var newUser = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    }
    this.http.checkUser(newUser).subscribe(
      data=>{
        // console.log("HERE -->", data);
        if (data == "No user exist!" ) {
          console.log ("There is no such player exist")
          this.loginForm.reset(this.loginForm.value);
          this.snackBar.open("Login Unsuccessful! Please Try Again.","X", {duration: 2000})
        }
        else{ //data found
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

          
          localStorage.setItem("userData", userdataString);

          // console.log("user data-->", dataJson.data.username)
          // console.log ("local Storage is :", localStorage.getItem("token"));

          if (this.http.getAuthentication()){
            this.appComponent.canDisplayed();
            this.appComponent.displayRegAndLogin = false;
            this.snackBar.open("Login Success!","",{duration:2000});
            this.router.navigate(["search"]);

          } else {
            this.loginForm.reset(this.loginForm.value);
            this.snackBar.open("Login Unsuccessful! Please Try Again.","X", {duration: 2000})
          }
        }
      },
      error => console.log(error)

    )}
    )
  }
  goToPassReset(){
    this.router.navigate(["passwordreset"]);
  }

  goTo(){
    this.router.navigate(["passwordreset"]);
  }

  goToAccount(){
    this.router.navigate(["myaccount"]);
  }
}
