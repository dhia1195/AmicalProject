import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private apiUrl = 'http://localhost:3000/reservations';

  constructor(private http: HttpClient) {}



  getAllReservations(): Observable<{ reservations: any[] }> {
    return this.http.get<{ reservations: any[] }>(`${this.apiUrl}/getall`);
  }

  updateReservation(id: string, updateData: Partial<any>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/update/${id}`, updateData);
  }

  deleteReservation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getReservationById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getbyid/${id}`);
  }

  reserveEvent(reservationData: Partial<any>): Observable<any> {
    return this.http.post(`${this.apiUrl}/reserve-event`, reservationData);
  }

  countReservationsForEvent(eventId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/count-reservations/${eventId}`);
  }
  getReservationsByEventId(eventId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/by-event/${eventId}`).pipe(
      catchError(error => {
        console.error('Error fetching reservations:', error);
        throw error; // Rethrow or handle the error appropriately
      })
    );
  }
  verifyReservation(token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify`, { token });
  }
}
