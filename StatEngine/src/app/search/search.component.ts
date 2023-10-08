import { Component, OnDestroy} from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { Router, RouterConfigOptions } from '@angular/router';
import { SearchService } from '../_services/search.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent{
  message = ""
  display_user = false


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
    profile_img_url: "",
    friend_list: "",
  }

  constructor(private searchServ:SearchService,private formBuilder: FormBuilder, private http: HttpService, private router: Router){


    this.display_user = false
    // console.log("MESSAGE HERE: ", this.searchHttp.message)
    if (this.searchServ.message == "There is no such player exist") {
      this.message = this.searchServ.message
      this.display_user = true
    }
    else{
      
      var data = this.searchServ.userData
      this.userData = {
        id: data["id"],
        username: data["username"],
        email: data["email"],
        password: data["password"],
        steamID: data["steamID"],
        introduction: data["introduction"],
        KD: data["KD"],
        likes: data["likes"],
        dislikes: data["dislikes"],
        karmaRatio: data["karmaRatio"],
        profile_img_url: data["profile_img_url"],
        friend_list: data["friend_list"],
      }
      this.display_user = true
      // console.log ("data is here:" , this.userData)
    }




    // localStorage.removeItem("searchResult")

  }





  navigateSearchPage(){
    this.router.navigate(['search'])
  }

  favorite() {
          // var userdataJson = JSON.parse(localStorage.getItem("userData"));
          // var searchDataJson = JSON.parse(localStorage.getItem("searchResult"));
          // console.log ("The friendlist", userdataJson.friend_list)
          // userdataJson.friend_list.push(searchDataJson.id)

          // localStorage.setItem("userData", JSON.stringify(userdataJson))
          // console.log (userdataJson)


          var test = ""

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

