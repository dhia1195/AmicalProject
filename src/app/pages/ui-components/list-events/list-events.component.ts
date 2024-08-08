import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router'; 
import { MatIconModule } from '@angular/material/icon';
import { ReservationsService } from 'src/app/services/reservations.service';
import { map } from 'rxjs/operators'; // Make sure to import map operator

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatButtonModule, MatIconModule],
})
export class ListEventsComponent implements OnInit {
  displayedColumns: string[] = ['titre', 'description', 'image', 'statusEvent', 'type', 'btn_href', 'btn_name', 'created', 'updated', 'deleted', 'reservations', 'actions'];
  dataSource = new MatTableDataSource<any>();
  errorMessage: string = '';

  constructor(
    private eventsService: EventsService,
    private router: Router,
    private reservationService: ReservationsService
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventsService.getAllEvents().subscribe({
      next: (data) => {
        const events = data.events;
        this.dataSource.data = events;
        events.forEach(event => {
          this.countReservationsForEvent(event._id).subscribe({
            next: (count) => {
              if (typeof count === 'number') {
                event.reservations = count;
              } else {
                console.error('Unexpected response format:', count);
                event.reservations = 0;
              }
              this.dataSource.data = [...this.dataSource.data];
            },
            error: (error) => {
              console.error('Error fetching reservation count:', error);
              event.reservations = 0;
            }
          });
        });
      },
      error: (error) => {
        this.errorMessage = 'Error fetching events';
        console.error(error);
      }
    });
  }
  
  countReservationsForEvent(eventId: string) {
    return this.reservationService.countReservationsForEvent(eventId).pipe(
      map(response => response.count) // Adjust based on actual response structure
    );
  }
  

  deleteEvent(id: string): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventsService.deleteEvent(id).subscribe({
        next: () => {
          this.loadEvents(); // Refresh the list after deletion
        },
        error: (error) => {
          console.error('Error deleting event:', error);
        }
      });
    }
  }

  updateEvent(id: string): void {
    this.router.navigate(['/updateEvents', id]); // Navigate to the update page with the event ID
  }
}
