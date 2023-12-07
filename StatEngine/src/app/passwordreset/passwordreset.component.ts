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
      oldpassword:['',[Validators.required]],
      newpassword:['',[Validators.required]]
    })
}

// async resetPassword(){
//   var userData = [
//     {username: this.resetForm.value.username},
//     {oldpassword: this.resetForm.value.oldpassword},
//   ]
//   // convertedData: JSON = JSON.parse(JSON.stringify(userData));
//   await this.http.checkUser(userData).subscribe(
//     data=>{
//       var dataString = JSON.stringify(userData);
//       var dataJson = JSON.parse(dataString);
//     },
//     error => console.log(error)
//   )
//  //this.http.updatePassword(convertedData);
// }

onPasswordReset(){

    const username = this.resetForm.value.username
    const newpassword = this.resetForm.value.newpassword
    const oldpassword = this.resetForm.value.oldpassword
    const userid = JSON.parse(localStorage.getItem("userData"))["userid"]
    const token = JSON.parse(localStorage.getItem("userData"))["token"]
  
    
    this.http.updatePassword(username, token, userid, oldpassword, newpassword).subscribe(
      (data:any)=>{
        if (data.message == "Updated password Successfully!"){
          this.router.navigate(['myaccount']);
          this.snackBar.open("Updated password Successfully!","",{duration:2000});
        }
  
        
      },
      error =>{
  
        if (error.status == 500 ){
          if (error.error.error == "Error in finding user") {
            this.snackBar.open("Error in finding user","",{duration:2000});
          }
          else if (error.error.error == "Old Password does not match"){
            this.snackBar.open("Old Password does not match","",{duration:2000});
          }
          else {
            console.log("An error occured:", error);
          }
        }
        else {
          console.log("An error occured:", error);
        }
      } 
    )


  

}

}
