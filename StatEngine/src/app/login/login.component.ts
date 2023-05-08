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


  async onLogin(){
    var newUser = {
      username: this.loginForm.value.username,
      password:this.loginForm.value.password,
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
}
