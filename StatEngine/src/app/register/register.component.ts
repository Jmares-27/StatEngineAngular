import { Component } from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { Router, RouterConfigOptions } from '@angular/router';
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

  constructor(private formBuilder: FormBuilder, private http: HttpService, private router: Router, private snackBar: MatSnackBar){
    this.registerForm = this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
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
        // console.log("HERE -->", data);
        if ( data == "Email has been used!") {

          this.snackBar.open("Email has been used!","Login",{duration:2000}).onAction()
          .subscribe(() => {
            this.router.navigate(['login']);
          });
        }
        else if  ( data == "Sign Up Success!" ) {

          this.snackBar.open("Registration successful! Redirecting...","",{duration:2000});
          this.router.navigate(['login'])


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
