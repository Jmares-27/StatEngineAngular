import { Component } from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { Router, RouterConfigOptions, ActivatedRoute,} from '@angular/router';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  registerForm:FormGroup;
  message = ""
  status_checker = false
  constructor(private formBuilder: FormBuilder, private http: HttpService, private router: Router, private snackBar: MatSnackBar, private ar: ActivatedRoute){
    this.registerForm = this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
    this.ar.queryParams.subscribe(params => {
      console.log(params)

     
      
      });
  }

  onClickToSignIn(){
    this.router.navigate(['login']);
  }

  onSubmit(){


    var newUser = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    }
    this.http.createUser(newUser).subscribe(
      data=>{
        // console.log("Register data -->", data);
        if ( data == "Email has been used!" ) {
          // // console.log("inside email been used") //used for testing

          this.snackBar.open("Email has been used","Login",{duration:2000}).onAction()
          .subscribe(() => {
            // Redirect to the login page
            this.onClickToSignIn()
          });
        }
        else if  ( data == "Sign Up Success!" ) {

          this.snackBar.open("Registration successful! Redirecting...","",{duration:2000});
          this.router.navigate(['login'])
          console.log("Sign Up success!")
          window.location.href = "http://localhost:3026/api/auth/steam/return";
          this.ar.queryParams.subscribe(params => {
            console.log(params)

           
            
            });
          // console.log("user data-->", data)


        }
      },
      error => console.log(error)
    )

  }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}