import { Component } from '@angular/core';
import { HttpService } from '../_services/http.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  public items: any = [];
  
  constructor(private http: HttpService) {
    console.log(JSON.parse(localStorage.getItem('userData'))['steamID']);
    var steamID = JSON.parse(localStorage.getItem('userData'))['steamID'];
    this.items = this.http.getInventory(steamID).subscribe(
      (data) => {
        console.log(data);
        this.items = data;
      },
      (error) => {
        console.error('Error getting inventory:', error);
      }
    )

  }


}
