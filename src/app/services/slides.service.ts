import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlidesService {

  private url: string = "http://localhost:3000/slides";

  constructor(private _http: HttpClient) {}

  public getAllSlides(): Observable<{ slides: any[] }> {
    return this._http.get<{ slides: any[] }>(`${this.url}/getall`).pipe(
      catchError((error: any) => {
        console.error('Error fetching all slides:', error);
        return throwError('Something went wrong while fetching slides.');
      })
    );
  }

  public getSlideById(_id: string) {
    return this._http.get(`${this.url}/getbyid/${_id}`).pipe(
      catchError((error: any) => {
        console.error(`Error fetching slide with ID ${_id}:`, error);
        return throwError('Something went wrong while fetching the slide.');
      })
    );
  }

  public addSlide(slide: any) {
    return this._http.post(`${this.url}/ajouter`, slide).pipe(
      catchError((error: any) => {
        console.error('Error adding slide:', error);
        return throwError('Something went wrong while adding slide.');
      })
    );
  }

  public updateSlide(id: string, slide: any) {
    return this._http.patch(`${this.url}/update/${id}`, slide).pipe(
      catchError((error: any) => {
        console.error(`Error updating slide with ID ${id}:`, error);
        return throwError('Something went wrong while updating the slide.');
      })
    );
  }

  public deleteSlide(id: string) {
    return this._http.delete(`${this.url}/${id}`).pipe(
      catchError((error: any) => {
        console.error(`Error deleting slide with ID ${id}:`, error);
        return throwError('Something went wrong while deleting the slide.');
      })
    );
  }

  // Nouvelle méthode pour obtenir les diapositives supprimées
  public getDeletedSlides(): Observable<{ slides: any[] }> {
    return this._http.get<{ slides: any[] }>(`${this.url}/getdeleted`).pipe(
      catchError((error: any) => {
        console.error('Error fetching deleted slides:', error);
        return throwError('Something went wrong while fetching deleted slides.');
      })
    );
  }

  // Nouvelle méthode pour restaurer une diapositive supprimée
  public restoreSlide(id: string): Observable<any> {
    return this._http.put(`${this.url}/restore/${id}`, {}).pipe(
      catchError((error: any) => {
        console.error(`Error restoring slide with ID ${id}:`, error);
        return throwError('Something went wrong while restoring the slide.');
      })
    );
  }
}
