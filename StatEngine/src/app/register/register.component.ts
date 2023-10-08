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
  message = ""
  status_checker = false
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
    // const currentDate = new Date();
    // var dateString = currentDate.getMonth()+1 + "/"  + currentDate.getDate()  + "/" + currentDate.getFullYear();
    // var newUser = {
    //   username: this.registerForm.value.username,
    //   email: this.registerForm.value.email,
    //   password:this.registerForm.value.password,
    //   introduction: "",
    //   steamID:"",
    //   kills: 0,
    //   deaths: 0,
    //   KD: 0,
    //   date_created: dateString,
    //   likes: 0,
    //   dislike: 0,
    //   karmaRatio: 1,
    //   profile_img_url: "assets/images/no_profile_img.png",
    //   friend_list: [],
    // }
    // console.log(newUser); //USED FOR TESTING


    var newUser = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    }
    this.http.createUser(newUser).subscribe(
      data=>{
        // console.log("HERE -->", data);
        if ( data == "Username or email already exist!" ) {
          // console.log("inside no data") //used for testing
          this.status_checker = true
          console.log("Username or email already exist!")
          this.message = "Username or email already exist!"
        }
        else if  ( data == "Sign Up Success!" ) {

          this.snackBar.open("Registration successful! Redirecting...","",{duration:2000});
          this.router.navigate(['login'])
          console.log("Sign Up success!")
          // console.log("user data-->", data)
          this.status_checker = true
          // this.message = "Sign Up Success!"

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
