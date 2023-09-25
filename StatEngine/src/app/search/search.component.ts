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
  userData = {
    id: "",
    username: "",
    email: "",
    password: "",
    steamID: "",
    introduction:"",
    KD: 0,
    likes: 0,
    dislikes: 0,
    karmaRatio: 1,
    img_url: "",
    friend_list: "",
    token: ""
  }

  constructor(private formBuilder: FormBuilder, private http: HttpService, private router: Router){
    // searchString: String;
    this.SearchForm = this.formBuilder.group({
      username:['',[Validators.required]],
    });
    this.message = localStorage.getItem("searchResult")
    console.log("the message is:", localStorage.getItem("searchResult"))
    if (localStorage.getItem("searchResult") == "There is no such player exist") {
      this.message = "There is no such player exist"
    }
    else{
      var dataJson = JSON.parse(localStorage.getItem("searchResult"));
      this.userData = {
        id: dataJson.id,
        username: dataJson.username,
        email: dataJson.email,
        password: dataJson.password,
        steamID: dataJson.steamID,
        introduction: dataJson.introduction,
        KD: dataJson.KD,
        likes: dataJson.likes,
        dislikes: dataJson.dislike,
        karmaRatio: dataJson.karmaRatio,
        img_url: dataJson.profile_img_url,
        friend_list: dataJson.friendlist,
        token: dataJson.token
      }
      console.log ("data is ere:" , this.userData)
    }




    // localStorage.removeItem("searchResult")

  }

  favorite() {
          var userdataJson = JSON.parse(localStorage.getItem("userData"));
          var searchDataJson = JSON.parse(localStorage.getItem("searchResult"));
          console.log ("The friendlist", userdataJson.friend_list)
          userdataJson.friend_list.push(searchDataJson.id)

          localStorage.setItem("userData", JSON.stringify(userdataJson))
          console.log (userdataJson)


        

        }
  }


  // onSubmit(){
  //   // console.log()
    

  //   this.searchString = this.SearchForm.value.username
  //   // console.log(this.searchString); //USED FOR TESTING

  //   this.http.searchUser(this.searchString ).subscribe(
  //     data=>{
  //       // console.log("HERE -->", data);
  //       if (data == "No user exist!" ) {
  //         // console.log("inside no data") //used for testing
  //         this.status_checker = true
  //         console.log ("There is no such player exist")
  //         this.message = "There is no such player exist"
  //       }
  //       else{
  //         //datafound?
  //         console.log("user data-->", data)
  //         this.status_checker = true
  //         this.message = "User found!"
  //       }
  //     },
  //     error => console.log(error)
  //   )
  // }

