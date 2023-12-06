import { Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { Router, RouterConfigOptions } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { InventoryDialogComponent } from '../inventory-dialog/inventory-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  userId: string
  userName: string;
  lm_result: string;
  lm_kd: number;
  lm_adr: number;

  oa_kd: number;
  oa_adr: number;
  oa_hsp: number;

  userBeenFavorited : boolean;

  profile_img_url:string;
  steamIDForm: FormGroup;
  private currentUserSID: string;
  public items: any = [];
  public displayedColumns = ['name', 'price', 'quantity'];
  public searchText: string = "";
  public page = 1;
  public pageSize = 100;
  public pageSizeOptions: number[] = [100, 250, 1000];
  constructor(private router:Router, private route:ActivatedRoute, private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar, public dialog:MatDialog){


    this.steamIDForm = this.fb.group({
      steamID: ["", Validators.required]
    });

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
  


  onIDSubmit(){
    // console.log(this.steamIDForm.value.steamID)
    // console.log(JSON.parse(localStorage.getItem("userData"))["username"])


    this.http.updateSteamID(this.steamIDForm.value.steamID, this.userName).subscribe((data)=>{
      this.snackBar.open("Steam ID Updated!","",{duration:2000});
    })
  }
  


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['userid'];
      const userid = JSON.parse(localStorage.getItem("userData"))["userid"]

      if ( this.userId == userid) {
        this.router.navigate(["myaccount"]);
      }else{

        // Check if the user's favorite status has been stored in local storage
        const user_favorite_list = JSON.parse(localStorage.getItem("userData"))["favorite_list"]
        this.userBeenFavorited = user_favorite_list.includes(this.userId);  
        this.getStatfunction()
        this.getSteamAvatarFunction()
      }
    });

    this.http.getUserSteamID(this.userId).pipe(
      switchMap((data) => {
        this.currentUserSID = data.toString();
        console.log("current user steam id: ", this.currentUserSID);
        if (this.currentUserSID) {
          return this.http.getUserInventory(this.currentUserSID);
        } else {
          // Handle the case where there is no steamID
          throw new Error('No SteamID found');
        }
      })
    ).subscribe(
      (data) => {
        this.items = data;
      },
      (error) => {
        // Handle any errors that occur
        console.error('Error:', error);
      }
    );
  }

  getSteamAvatarFunction(){
    this.http.getSteamAvatarUrl(this.userId).subscribe(
      (url: string) => {
        // console.log (url);
        this.profile_img_url = url

    },
    (error) => {
      if (error.status === 500) {
        // Handle the 500 error
        // this.snackBar.open(`${error.error.message}`,"",{duration:5000});
        this.profile_img_url =  null       // console.error('Server error (500):', error.error);
        // You can also display an error message to the user
      } else {
        // Handle other errors
        console.error('Error:', error);
      }
    })

  }


  getStatfunction (){

    this.http.getStats(this.userId).subscribe((data)=>{

      
      var body = JSON.parse(JSON.stringify(data))
      console.log(body)
      this.userName = body["username"]
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
        // console.log ("error username", error.error.username)
        this.userName = error.error.username
        this.lm_result = null
        this.lm_kd = null
        this.lm_adr = null
        this.oa_kd = null
        this.oa_adr = null
        this.oa_hsp = null
        // You can also display an error message to the user
      } else {
        // Handle other errors
        console.error('Error:', error);
      }
    })
  
  
  
  
  }

  favorite (){
      this.route.params.subscribe((params) => {
        this.userId = params['userid'];
        this.http.favorite(this.userId)
      })
      // console.log ("now favorite")
      // this.userBeenFavorited = true
  }
  unfavorite(){
    this.route.params.subscribe((params) => {
      this.userId = params['userid'];
      this.http.unfavorite(this.userId)
    })
    // console.log ("no longer favorite")
    // this.userBeenFavorited = false
  }

  toggleFavorite() {

    if (this.userBeenFavorited) {
      this.unfavorite(); // Call unfavorite() when user is already favorited
    } else {
      this.favorite(); // Call favorite() when user is not favorited
    }
    // this.userBeenFavorited = !this.userBeenFavorited; // Toggle the favorite status

    window.location.reload();
    // this.ngOnInit();
;
  }
}


