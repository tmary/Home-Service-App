import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceProvider } from './model/service-provider.model';


@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {
  private serviceProvidersUrl = 'http://localhost:3000/app/service-providers';

  constructor(private http: HttpClient) { }

  getServiceProviders(): Observable<ServiceProvider[]> {
    return this.http.get<ServiceProvider[]>(this.serviceProvidersUrl);
  }

  updatedServiceAreas(provider: ServiceProvider): Observable<void> {
    const updateUrl = '${this.serviceProvidersUrl}/${provider.id}/service-areas';
    const updatedProvider = {...provider, serviceAreas:provider.areasOfService };
    return this.http.put<void>(updateUrl,updatedProvider);
  }
}
