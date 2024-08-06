import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private url: string = "http://localhost:3000/events";

  constructor(private _http: HttpClient) {}

  public getAllEvents(): Observable<{ events: any[] }> {
    return this._http.get<{ events: any[] }>(`${this.url}/getall`).pipe(
      catchError((error: any) => {
        console.error('Error fetching all events:', error);
        return throwError('Something went wrong while fetching events.');
      })
    );
  }

  public getEventById(_id: string) {
    return this._http.get(`${this.url}/getbyid/${_id}`).pipe(
      catchError((error: any) => {
        console.error(`Error fetching event with ID ${_id}:`, error);
        return throwError('Something went wrong while fetching the event.');
      })
    );
  }

  public addEvent(event: any) {
    return this._http.post(`${this.url}/ajouter`, event).pipe(
      catchError((error: any) => {
        console.error('Error adding event:', error);
        return throwError('Something went wrong while adding event.');
      })
    );
  }

  public updateEvent(id: string, event: any) {
    return this._http.patch(`${this.url}/update/${id}`, event).pipe(
      catchError((error: any) => {
        console.error(`Error updating event with ID ${id}:`, error);
        return throwError('Something went wrong while updating the event.');
      })
    );
  }

  public deleteEvent(id: string) {
    return this._http.delete(`${this.url}/${id}`).pipe(
      catchError((error: any) => {
        console.error(`Error deleting event with ID ${id}:`, error);
        return throwError('Something went wrong while deleting the event.');
      })
    );
  }
  public getDeletedEvents(): Observable<{ events: any[] }> {
    return this._http.get<{ events: any[] }>(`${this.url}/getdeleted`).pipe(
      catchError((error: any) => {
        console.error('Error fetching deleted events:', error);
        return throwError('Something went wrong while fetching deleted events.');
      })
    );
  }

  public restoreEvent(id: string): Observable<any> {
    return this._http.put(`${this.url}/restore/${id}`, {}).pipe(
      catchError((error: any) => {
        console.error(`Error restoring event with ID ${id}:`, error);
        return throwError('Something went wrong while restoring the event.');
      })
    );
  }
}
