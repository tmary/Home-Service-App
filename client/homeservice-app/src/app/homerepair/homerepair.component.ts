import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BookingComponent } from '../booking/booking.component';
import { MatDialogConfig } from '@angular/material/dialog';
import { ServiceListComponent } from '../service-list/service-list.component';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-homerepair',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './homerepair.component.html',
  styleUrls: ['./homerepair.component.scss']
})
export class HomerepairComponent implements OnInit {
  isAdmin: boolean = true;
  services = [
    {name: 'Plumbing', imageUrl:'./assets/images/plumber.jpg', description:'Professional plumbing services.'},
    { name: 'Electrical Repair', imageUrl:'./assets/images/elect.jpg', description:'Expert electrical repair.'},
    { name: 'Painting', imageUrl:'./assets/images/painter2.jpg', description:'Make that space Pop with color.'},
    {name: 'Mowing', imageUrl:'./assets/images/mowing.jpg', description:'Professional lawn mowers, gardeners.'},
    {name: 'Furniture Assembling', imageUrl:'./assets/images/furniture.jpg', description:'Assembling beds, closets, chairs and more. '},
    {name: 'Cleaning Services', imageUrl:'./assets/images/clean.jpg', description:'Bringing life and shine to that space.'}

  ];
  constructor(private router: Router, private dialog: MatDialog, public authService: AuthService) {}

  ngOnInit(): void {

  }

  openBookingDialog():void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.height ='500px';
    dialogConfig.panelClass = 'custom-dialog-container';

    const dialogRef = this.dialog.open(BookingComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result === 'book') {
        dialogRef.close();
      }
    });
  }

  openServiceList(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.height ='500px';
    dialogConfig.panelClass = 'custom-dialog-container';

    const dialogRef = this.dialog.open(ServiceListComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialod was closed', result);
    });
  }
}
