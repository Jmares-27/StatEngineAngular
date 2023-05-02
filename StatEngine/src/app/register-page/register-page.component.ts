import { Component } from '@angular/core';
import { AuthenticationService } from '../backend-services/authentication.service';

import { FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  public signupform: FormGroup;
  constructor( private router:Router, private http: HttpClient, private formBuilder: FormBuilder) {
    this.signupform = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]

    });
  }


  // username = "";
  // email = "";
  // password = "";
  display_checker: boolean = false;

  onSubmit() {

    console.log(this.signupform.value);


    this.http.post('http://localhost:3005/register', {username: this.signupform.value.username, password: this.signupform.value.password, email: this.signupform.value.email })
    .subscribe(
      data => {
        console.log(data);
        // this.router.navigate(['/homepage']);
      },
      error => {
        console.log(error);
      }
    );

    this.display_checker = true;
    this.router.navigate(['/search-player'])
  }

  


}

