import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpService } from '../_services/http.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent {
  resetForm;
  message = ""
  status_checker = false
  constructor(private formBuilder: FormBuilder, private http: HttpService, private router: Router, public snackBar: MatSnackBar){
    this.resetForm = this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
}

async resetPassword(){
  var userData = {
    username: this.resetForm.value.username,
    password:this.resetForm.value.password,
  }
  await this.http.checkUser(userData).subscribe(
    data=>{
      var dataString = JSON.stringify(userData);
      var dataJson = JSON.parse(dataString);
    },
    error => console.log(error)
  )
  //this.http.updatePassword()
}

onSubmit(){

  var profilename = this.resetForm.value.username
  var profilepassword = this.resetForm.value.password

  this.http.updatePassword(profilename, profilepassword).subscribe(
    data=>{
      // console.log("HERE -->", data);
      if ( !data ) {
        console.log("inside no data") //used for testings
        this.status_checker = true
        this.message = "There is no such player exist"
      }
      else{
        
        console.log("user data-->", data)
        this.status_checker = true
        this.message = "password updated successfully!!"
      }
    },
    error => console.log(error)
  )
  

}

}
