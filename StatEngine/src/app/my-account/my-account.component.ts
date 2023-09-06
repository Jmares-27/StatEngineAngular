import { Component } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  message = ""
  status_checker = false
  searchString = ""
  deleteForm;
  constructor(private formBuilder: FormBuilder, private http: HttpService, private router: Router){
    // searchString: String;
    this.deleteForm = this.formBuilder.group({
      username:['',[Validators.required]],
    });
  }

  onSubmit(){
    this.http.deleteAccount(this.deleteForm.value.username ).subscribe(
      data=>{
        // console.log("HERE -->", data);
        if ( !data ) {
          // console.log("inside no data") //used for testing
          this.status_checker = true
          this.message = "There is no such player exist"
        }
        else{
          
          console.log("user data-->", data)
          this.status_checker = true
          this.message = "Delete successfully!!"
          this.http.logOut();
        }
      },
      error => console.log(error)
    )
  }
 
}
