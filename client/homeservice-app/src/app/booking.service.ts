import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking} from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingUrl = 'http://localhost:3000/app/bookings';

  constructor(private http: HttpClient) { }

  submitBooking(bookingData: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.bookingUrl,bookingData);
  }

  cancelBooking(id: number): Observable<any> {
    const url = '${this.bookingUrl}/${id}';
    return this.http.delete(url);
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.bookingUrl);
  }
}
