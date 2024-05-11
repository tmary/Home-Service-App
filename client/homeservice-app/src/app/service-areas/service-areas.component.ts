import { Component, OnInit } from '@angular/core';
import { ServiceProvider } from '../model/service-provider.model';
import { ServiceProviderService } from '../service-provider.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-areas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-areas.component.html',
  styleUrl: './service-areas.component.scss'
})
export class ServiceAreasComponent implements OnInit {
  serviceProviders: ServiceProvider[] = [];
  newServiceArea: string = '';
  constructor(private serviceProviderService: ServiceProviderService, private router: Router) {}

  ngOnInit(): void {
    this.fetchServiceProviders();
  }

  fetchServiceProviders(): void {
    this.serviceProviderService.getServiceProviders().subscribe((serviceProviders: ServiceProvider[]) => {
      this.serviceProviders = serviceProviders;
    },
  (error:any) => {
    console.error('Error fetching service providers:', error);
   }
 );
  }

  addServiceArea(providerId: number): void {
    const providerIndex = this.serviceProviders.findIndex(provider => provider.id === providerId);
    if (providerIndex! == -1 && this.newServiceArea.trim() ! == '') {
      this.serviceProviders[providerIndex].areasOfService.push(this.newServiceArea.trim());
      this.updateProviderServiceAreas(this.serviceProviders[providerIndex]);
      this.newServiceArea = '';
    }
  }

  updateProviderServiceAreas(provider: ServiceProvider): void {
    this.serviceProviderService.updatedServiceAreas(provider).subscribe(() => {
      console.log('Service area updated successfully');
    },
 ( error: any) => {

 });
  }
}
