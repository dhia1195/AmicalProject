import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConventionsService {

  private apiUrl = 'http://localhost:3000/conventions'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  // Create a new convention
  public ajouterConvention(convention: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ajouter`, convention).pipe(
      catchError((error: any) => {
        console.error('Error adding convention:', error);
        return throwError('Something went wrong while adding the convention.');
      })
    );
  }

  // Get all conventions
  public getAllConventions(): Observable<{ conventions: any[] }> {
    return this.http.get<{ conventions: any[] }>(`${this.apiUrl}/getall`).pipe(
      catchError((error: any) => {
        console.error('Error fetching all conventions:', error);
        return throwError('Something went wrong while fetching conventions.');
      })
    );
  }

  // Get a specific convention by ID
  public getConventionById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getbyid/${id}`).pipe(
      catchError((error: any) => {
        console.error(`Error fetching convention with ID ${id}:`, error);
        return throwError('Something went wrong while fetching the convention.');
      })
    );
  }

  // Update an existing convention by ID
  public updateConvention(id: string, updateData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/update/${id}`, updateData).pipe(
      catchError((error: any) => {
        console.error(`Error updating convention with ID ${id}:`, error);
        return throwError('Something went wrong while updating the convention.');
      })
    );
  }

  // Delete a convention (soft delete, sets the deleted flag)
  public deleteConvention(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error: any) => {
        console.error(`Error deleting convention with ID ${id}:`, error);
        return throwError('Something went wrong while deleting the convention.');
      })
    );
  }

  // Get all deleted conventions
  public getDeletedConventions(): Observable<{ conventions: any[] }> {
    return this.http.get<{ conventions: any[] }>(`${this.apiUrl}/getdeleted`).pipe(
      catchError((error: any) => {
        console.error('Error fetching deleted conventions:', error);
        return throwError('Something went wrong while fetching deleted conventions.');
      })
    );
  }

  // Restore a deleted convention
  public restoreConvention(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/restore/${id}`, {}).pipe(
      catchError((error: any) => {
        console.error(`Error restoring convention with ID ${id}:`, error);
        return throwError('Something went wrong while restoring the convention.');
      })
    );
  }
}
