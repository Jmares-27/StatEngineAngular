import { Component } from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { Router, RouterConfigOptions } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchString = new FormControl('', Validators.required);

  constructor(private formBuilder: FormBuilder, private http: HttpService, private router: Router){}


  onSubmit(){
    console.log()
    var searchUser = {
      username: this.searchString
    }
    console.log(searchUser); //USED FOR TESTING
    this.http.createUser(searchUser).subscribe(
      data=>{
        console.log(data);
      },
      error => console.log(error)
    )
  }
}
