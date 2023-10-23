import { Component } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconRegistry } from '@angular/material/icon';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  public items: any = [];
  public displayedColumns = ['name', 'price', 'quantity'];
  public searchText: string = "";
  
  constructor(private http: HttpService) {
    console.log(JSON.parse(localStorage.getItem('userData'))['steamID']);
    var steamID = JSON.parse(localStorage.getItem('userData'))['steamID'];
    this.items = this.http.getInventory(steamID).subscribe(
      (data) => {
        // console.log(data);
        this.items = data;
      },
      (error) => {
        console.error('Error getting inventory:', error);
      }
    )

  }

  get filteredItems():any[] {
    return this.items.filter((item) => {
      return item.name.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }



}
