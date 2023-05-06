import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName} from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { Router } from '@angular/router';
import { user } from '../user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm;
  constructor(private formBuilder: FormBuilder, private http: HttpService, private router: Router){
    this.loginForm = this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }


  async onLogin(){
    console.log()
    var newUser = {
      username: this.loginForm.value.username,
      password:this.loginForm.value.password,
    }
    console.log(newUser); //USED FOR TESTING
    await this.http.checkUser(newUser).subscribe(
      data=>{
        console.log("DATA: ",data)
      },
      error => console.log(error)
    )
  }
}
