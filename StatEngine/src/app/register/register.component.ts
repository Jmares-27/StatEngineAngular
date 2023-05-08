import { Component } from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { Router, RouterConfigOptions } from '@angular/router';
import { user } from '../user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm;
  constructor(private formBuilder: FormBuilder, private http: HttpService, private router: Router, private snackBar: MatSnackBar){
    this.registerForm = this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }


  onSubmit(){
    console.log()
    var newUser = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password:this.registerForm.value.password,
      steamID:""
    }
    // console.log(newUser); //USED FOR TESTING
    this.http.createUser(newUser).subscribe(
      data=>{
        console.log(data);
      },
      error => console.log(error)
    )
    this.snackBar.open("Registration successful! Redirecting...","",{duration:2000});
    this.router.navigate(['login'])
  }
}
