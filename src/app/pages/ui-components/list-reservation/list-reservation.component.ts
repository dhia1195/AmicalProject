import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe] 
})
export class ListReservationComponent implements OnInit {
  reservations: any[] = [];
  paginatedReservations: any[] = [];
  errorMessage: string = '';
  currentEvent: any = null;
  pageSize: number = 10;
  currentPage: number = 0;
  totalPages: number = 0;

  constructor(private reservationsService: ReservationsService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.getAllReservations();
  }

  getAllReservations(): void {
    this.reservationsService.getAllReservations().subscribe({
      next: (response) => {
        console.log('Reservations Data:', response);
        this.reservations = response.reservations;
        this.totalPages = Math.ceil(this.reservations.length / this.pageSize);
        this.updatePaginatedReservations();
      },
      error: (error) => {
        this.errorMessage = 'Error fetching reservations';
        console.error(error);
      }
    });
  }

  updatePaginatedReservations(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedReservations = this.reservations.slice(startIndex, endIndex);
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

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedReservations();
  }

  getPageRange(): string {
    const start = this.currentPage * this.pageSize + 1;
    const end = Math.min((this.currentPage + 1) * this.pageSize, this.reservations.length);
    return `${start} - ${end}`;
  }
}
