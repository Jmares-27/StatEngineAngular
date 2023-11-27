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
      <p>Steam Price: {{data.price / 100 | currency:'USD':true}}</p>
      <p>Arbitrage: {{data.suggested_price / 1000 - data.price / 100 | currency:'USD':true}}</p>
    </div>
      `
})
export class InventoryDialogComponent {
  constructor(public dialogRef: MatDialogRef<InventoryDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  onClose(): void {
    this.dialogRef.close();
  }
}
