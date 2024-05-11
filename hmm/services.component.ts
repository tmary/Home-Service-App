import { Component, OnInit } from '@angular/core';
import { Service } from './service.model';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { ServiceDetailsComponent } from './service-details.component';
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ServiceDetailsComponent
  ],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [
    {
      id: 1,
      name: 'Plumbing',
      description: 'From routine maintenance and repairs to complex installations like dripping faucet, a backed-up sewer line and emergency services.',
      imageUrl: './assets/images/plumber.jpg',
      price: 0,
      hours: ''
    },
    {
      id: 2,
      name: 'Gardening',
      description: 'Everything from soil preparation and planting to irrigation, mulching, and ongoing maintenance.Ready to transform your outdoor space?',
      imageUrl: './assets/images/mowing.jpg',
      price: 20000,
      hours: '3 hours'
    },
      {
        id: 3,
        name: 'Assembling Furniture',
        description: 'With meticulous attention to detail and precision, we will ensure that your furniture is assembled securely and functions perfectly',
        imageUrl: './assets/images/furniture.jpg',
        price: 10000,
        hours: '2 hours'
      },
        {
          id: 4,
          name: 'Electrical Repair Services',
          description: 'Are flickering lights, tripping breakers, or faulty outlets casting a shadow over your homes safety and comfort? Turn to the trusted experts for reliable solutions!',
          imageUrl: './assets/images/electrical.jpg',
          price: 150000,
          hours: '1 hour'
        },
        {
          id: 5,
          name: 'Painting Services',
          description: ' looking to update your interior walls, refresh your exterior facade, or add a pop of color to your commercial space,',
          imageUrl: './assets/images/painting.jpg',
          price: 150000,
          hours: '1 hour'
        },
        {
          id: 6,
          name: 'Cleaning Services',
          description: 'From dusting and vacuuming to sanitizing and decluttering, our skilled cleaners will leave no corner untouched',
          imageUrl: './assets/images/cleaning.jpg',
          price: 150000,
          hours: '1 hour'
        }
  ];
  selectedService!: Service;
  constructor() {}

  ngOnInit(): void {

  }
}
