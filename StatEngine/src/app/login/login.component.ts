import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName} from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
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
    this.http.checkUser({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    }).subscribe((data: any) => { 
        if (data == 'No user exist!') {
          console.log('There is no such player exist');
          this.loginForm.reset(this.loginForm.value);
          this.snackBar.open('Login Unsuccessful! Please Try Again.', 'X', {
            duration: 2000,
          });
        } else  {
          // Create a User object and populate it with data
          const user: User = data.data;
          const userToken = data.data.token;
          // console.log('User:', user);
          // console.log("User token: ", userToken)
          localStorage.setItem('userToken',  JSON.stringify(userToken))
          localStorage.setItem('userData',  JSON.stringify(user))

          if (this.http.getAuthentication()){
            this.appComponent.canDisplayed();
            this.appComponent.displayRegAndLogin = false;
            this.snackBar.open("Login Success!","",{duration:2000});
            this.router.navigate(["myaccount"]);

          } else {
            this.loginForm.reset(this.loginForm.value);
            this.snackBar.open("Login Unsuccessful! Please Try Again.","X", {duration: 2000})
          }
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
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



