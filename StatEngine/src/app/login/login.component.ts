import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName} from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';
import { UserResponse } from '../models/userResponse.model';
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


          // Create a UserResponse object and populate it with data
          const userData: UserResponse = data.data;
          // console.log('UserData:', userData);
          localStorage.setItem('userData',  JSON.stringify(userData))

          if (this.http.getAuthentication()){
            // this.appComponent.canDisplayed();
            this.appComponent.hasLoggedIn = true;
            this.snackBar.open("Login Success!","",{duration:2000});
            this.router.navigate(["myaccount"]);

          } else {
            this.loginForm.reset(this.loginForm.value);
            this.snackBar.open("Login Unsuccessful! Please Try Again.","X", {duration: 2000})
          }
        
      },
      (error) => {
        if (error.status == 500) {
          console.log ("Login error: ", error.error.error)
          if (error.error.error == "No user exist!") {
            this.loginForm.reset(this.loginForm.value);
            this.snackBar.open('Invalid password or username!', '', {duration: 2000});            
          }

        }
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



