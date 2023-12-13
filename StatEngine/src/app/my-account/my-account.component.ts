import { Component , OnInit} from '@angular/core';
import { HttpService } from '../_services/http.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserComponent } from '../user/user.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InventoryDialogComponent } from '../inventory-dialog/inventory-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  baseURL = this.http.baseURL
  steamId: string
  userId: string
  userName: string = JSON.parse(localStorage.getItem("userData"))["username"];
  lm_result: string;
  lm_kd: number;
  lm_adr: number;

  oa_kd: number;
  oa_adr: number;
  oa_hsp: number;

  profile_img_url:string;

  public items: any = [];
  public displayedColumns = ['name', 'price', 'quantity'];
  public searchText: string = "";
  public page = 1;
  public pageSize = 100;
  public pageSizeOptions: number[] = [100, 250, 1000];
  // steamIDForm: FormGroup;
  currentSteamID: string = JSON.parse(localStorage.getItem("userData"))["steamID"];
  constructor(private route:ActivatedRoute, private httpC: HttpClient,private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar, public dialog:MatDialog){

    
    this.userName = JSON.parse(localStorage.getItem("userData"))["username"];

    this.currentSteamID = JSON.parse(localStorage.getItem("userData"))["steamID"];
    this.http.getUserInventory(this.currentSteamID).subscribe((data)=>{
        this.items = data;
      }, (error) => {
        console.log('Error getting user inventory:', error);
      }
    )


    
  }

  ngOnInit(){
    document.getElementById("searchbar1").style.display="block";

    this.route.params.subscribe((params) => {
      this.steamId = params['steamid'];
      // console.log ("STEAMID IS: ", this.steamId)
      if (this.steamId !== undefined){
        const userid = JSON.parse(localStorage.getItem("userData"))["userid"];
        
          // console.log ("STEAMID SENT FROM BACKEND", this.steamId)
        this.http.updateSteamID(this.steamId, userid).subscribe(
          response => {
    
            //the backend should sent steamID set! at this point
            // this.snackBar.open(`${response.message}`,"",{duration:5000});
    
          },
          error => {
            if (error.status === 500) {
              
              this.snackBar.open(`${error.message}`,"",{duration:5000});
    
            } else {
              // Handle other errors
              console.error('Error:', error);
            }
          }  
        );



      

      }
      this.getStatfunction()
      this.getSteamAvatarFunction()

    })
  }


  getSteamAvatarFunction(){
    this.http.getSteamAvatarUrl(this.userId).subscribe(
      (url: string) => {
        // console.log (url);
        this.profile_img_url = url
        this.setSteamAvatarFunction()
    },
    (error) => {
      if (error.status === 500) {
        // Handle the 500 error
        this.snackBar.open(`${error.error.message}`,"",{duration:5000});

        // console.error('Server error (500):', error.error);
        // You can also display an error message to the user
      } else {
        // Handle other errors
        console.error('Error:', error);
      }
    })
  }
  
  setSteamAvatarFunction(){

    // this.getSteamAvatarFunction()

    const token = JSON.parse(localStorage.getItem("userData"))["token"]
    this.http.setSteamAvatarUrl(this.userId, token, this.profile_img_url).subscribe(
      (response: any) => {
        // console.log ("RESPONSE FROM SETSTEAMAVATARIN MYACCOUNT COMPONENT", response)
    },
    (error) => {
      if (error.status === 500) {
        // Handle the 500 error
        // this.snackBar.open(`${error.error.message}`,"",{duration:5000});
        // this.profile_img_url =  null       // console.error('Server error (500):', error.error);
        // You can also display an error message to the user
      } else {
        // Handle other errors
        console.error('Error:', error);
      }
    })

  }

  getStatfunction (){
    this.userId = JSON.parse(localStorage.getItem("userData"))["userid"];
    this.http.getStats(this.userId).subscribe((data)=>{

      
      var body = JSON.parse(JSON.stringify(data))
      // console.log(body)
      var last_match = body["last_match"]
      var overall = body["overall"]
      this.lm_result = last_match["last_match_result"]
      this.lm_kd = Math.round(parseFloat(last_match["last_match_kd"])*100)/100
      this.lm_adr = Math.round(parseFloat(last_match["last_match_adr"])*100)/100
      this.oa_kd = Math.round(parseFloat(overall["overall_kd"])*100)/100
      this.oa_adr = Math.round(parseFloat(overall["overall_adr"])*100)/100
      this.oa_hsp = Math.round(parseFloat(overall["overall_hsp"])*10000)/100

    },
    (error) => {
      if (error.status === 500) {
        // Handle the 500 error
        this.snackBar.open(`${error.error.message}`,"",{duration:5000});

        // console.error('Server error (500):', error.error);
        // You can also display an error message to the user
      } else {
        // Handle other errors
        console.error('Error:', error);
      }
    })
  
  }
  Steamlogin() {
    const redirectUrl =   `${this.baseURL}/api/auth/steam/`;
        // const redirectUrl =   `http://localhost:4200/api/auth/steam/`;
    window.location.href = redirectUrl
  }
  



  get filteredItems():any[] {
    return this.items.filter((item) => {
      return item.name.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  handlePageEvent(event: PageEvent){
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }

  openDialog(item:any){
    this.dialog.open(InventoryDialogComponent, {
      data: item
    });
  }

}
