import { Component } from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { Router, RouterConfigOptions } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {


  message = ""
  status_checker = false
  searchString = ""
  public deleteForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpService, private router: Router){
    // searchString: String;
    this.deleteForm = this.formBuilder.group({
      username:['',[Validators.required]],
    });
  }




  onSubmit(){


    this.searchString = this.deleteForm.value.username
    var resultdata = {
      message: ''
    }


    this.http.deleteAccount(this.searchString ).subscribe(
      data=>{
        // console.log("HERE -->", data);
        if ( !data ) {
          // console.log("inside no data") //used for testing
          this.status_checker = true
          this.message = "There is no such player exist"
        }
        else{
          //datafound?
          console.log("user data-->", data)
          this.status_checker = true
          this.message = "User found!"
        }
      },
      error => console.log(error)
    )
  }

}


