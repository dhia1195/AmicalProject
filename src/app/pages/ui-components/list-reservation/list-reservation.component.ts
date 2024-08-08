// list-reservation.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ListReservationComponent {
  reservations: any[] = [];
  errorMessage: string = '';
  currentEvent: any = null; // Make sure this is declared

  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    this.getAllReservations();
  }

  getAllReservations(): void {
    this.reservationsService.getAllReservations().subscribe({
      next: (response) => {
        console.log('Reservations Data:', response); // Check the structure
        this.reservations = response.reservations; // Correctly assign the reservations array
      },
      error: (error) => {
        this.errorMessage = 'Error fetching reservations';
        console.error(error);
      }
    });
  }

  deleteReservation(id: string): void {
    if (confirm('Are you sure you want to delete this reservation?')) {
      this.reservationsService.deleteReservation(id).subscribe({
        next: () => {
          this.getAllReservations(); // Refresh the list after deletion
        },
        error: (error) => {
          console.error('Error deleting reservation:', error);
        }
      });
    }
  }

  showPopup(event: any): void {
    this.currentEvent = event;
  }

  hidePopup(): void {
    this.currentEvent = null;
  }
}
