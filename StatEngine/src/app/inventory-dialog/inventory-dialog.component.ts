import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-inventory-dialog',
  template: `
    <div style="margin:10%; text-align: center">
      <h1> {{data.name}} </h1>
      <button mat-icon-button (click)="onClose()" style="position: absolute; right: 10px; top: 10px;">
        <mat-icon>close</mat-icon>
      </button>
    </div>
    <div style="text-align:center;padding-bottom:15%">
      <img [src]="data.image_url" style="width: 300px">
      <p>Bitskins Price: {{data.suggested_price / 1000 | currency:'USD':true}}</p>
      <p>Steam Price: {{data.steam_price / 100 | currency:'USD':true}}</p>
      <p>Arbitrage: {{data.suggested_price / 1000 - data.steam_price*0.85 / 100 | currency:'USD':true}}</p>
      <div>
        <h1> Arbitration Opportunity </h1>
        <p>Steam Profit: {{data.steam_price*0.85 / 100 | currency:'USD':true}}</p>
        <p>Bitskins Profit: {{data.suggested_price*bitskinsMultiplier(data.suggested_price) / 1000 | currency:'USD':true}}</p>
        <p> Arbitrage Recommendation: {{arbitrageCalculator(data.steam_price,data.suggested_price)}} </p>
      </div>
    </div>
      `
})
export class InventoryDialogComponent {
  constructor(public dialogRef: MatDialogRef<InventoryDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  onClose(): void {
    this.dialogRef.close();
  }

  bitskinsMultiplier(price:number):number{
    if (price<500000){
      return 0.9;
    } else if (price<2000000 && price>=500000){
      return 0.92;
    } else if (price<3000000 && price>=2000000){
      return 0.93;
    } else if (price<5000000 && price>=3000000){
      return 0.94;
    } else {
      return 0.95;
    }
  }

  arbitrageCalculator(steam_price:number, bitskinsprice:number):string{
    var steam_profit = steam_price*0.85 / 100;
    var bitskins_profit = bitskinsprice*this.bitskinsMultiplier(bitskinsprice) / 1000;
    if (steam_price<bitskins_profit){
      return "Buy on Steam, Sell on Bitskins";
    } else if (bitskinsprice<steam_profit){
      return "Buy on Bitskins, Sell on Steam";
    }
    return "No Arbitrage Opportunity";
  }
}
