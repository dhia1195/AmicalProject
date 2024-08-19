import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReservationsService } from 'src/app/services/reservations.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import * as XLSX from 'xlsx'; // Import the xlsx library

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  providers: [DatePipe]
})
export class ListReservationComponent implements OnInit {
  reservations: any[] = [];
  paginatedReservations: any[] = [];
  filteredReservations: any[] = [];
  searchEmail: string = '';
  errorMessage: string = '';
  currentEvent: any = null;
  selectedReservation: any = null;
  pageSize: number = 5;
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
        this.filteredReservations = this.reservations;
        this.totalPages = Math.ceil(this.reservations.length / this.pageSize);
        this.updatePaginatedReservations();
      },
      error: (error) => {
        this.errorMessage = 'Error fetching reservations';
        console.error(error);
      }
    });
  }

  filterReservations(): void {
    if (this.searchEmail) {
      this.filteredReservations = this.reservations.filter(reservation =>
        reservation.email.toLowerCase().includes(this.searchEmail.toLowerCase())
      );
    } else {
      this.filteredReservations = this.reservations;
    }
    this.updatePaginatedReservations();
  }

  updatePaginatedReservations(): void {
    const startIndex = this.currentPage * this.pageSize;
    this.paginatedReservations = this.filteredReservations.slice(startIndex, startIndex + this.pageSize);
  }

  deleteReservation(id: string): void {
    if (confirm('Are you sure you want to delete this reservation?')) {
      this.reservationsService.deleteReservation(id).subscribe({
        next: () => {
          this.getAllReservations();
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
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedReservations();
    }
  }

  getPageRange(): string {
    const start = this.currentPage * this.pageSize + 1;
    const end = Math.min((this.currentPage + 1) * this.pageSize, this.reservations.length);
    return `${start} - ${end}`;
  }

  openUpdateForm(reservation: any): void {
    this.selectedReservation = { ...reservation };
  }

  updateReservation(): void {
    if (this.selectedReservation) {
      this.reservationsService.updateReservation(this.selectedReservation._id, this.selectedReservation).subscribe({
        next: () => {
          this.getAllReservations();
          this.selectedReservation = null;
        },
        error: (error) => {
          console.error('Error updating reservation:', error);
        }
      });
    }
  }

  cancelUpdate(): void {
    this.selectedReservation = null;
  }

  // Method to generate the Excel file
  generateExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.reservations);
    const workbook: XLSX.WorkBook = { Sheets: { 'Reservations': worksheet }, SheetNames: ['Reservations'] };
    XLSX.writeFile(workbook, 'Reservations.xlsx');
  }
}
