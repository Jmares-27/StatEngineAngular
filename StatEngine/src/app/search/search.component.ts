import { Component} from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { Router, RouterConfigOptions } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent{
  message = ""
  status_checker = false
  searchString = ""
  public SearchForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpService, private router: Router){
    // searchString: String;
    this.SearchForm = this.formBuilder.group({
      username:['',[Validators.required]],
    });
  }


  onSubmit(){
    // console.log()
    

    this.searchString = this.SearchForm.value.username
    // console.log(this.searchString); //USED FOR TESTING

    this.http.searchUser(this.searchString ).subscribe(
      data=>{
        // console.log("HERE -->", data);
        if (data == "No user exist!" ) {
          // console.log("inside no data") //used for testing
          this.status_checker = true
          console.log ("There is no such player exist")
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
