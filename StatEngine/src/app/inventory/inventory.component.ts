import { Component } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconRegistry } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { InventoryDialogComponent } from '../inventory-dialog/inventory-dialog.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  public items: any = [];
  public displayedColumns = ['name', 'price', 'quantity'];
  public searchText: string = "";
  public page = 1;
  public pageSize = 100;
  public pageSizeOptions: number[] = [100, 250, 1000];
  
  constructor(private http: HttpService, public dialog:MatDialog) {
    var steamID = JSON.parse(localStorage.getItem('userData'))['steamID'];
    this.items = this.http.getMarketData().subscribe(
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
