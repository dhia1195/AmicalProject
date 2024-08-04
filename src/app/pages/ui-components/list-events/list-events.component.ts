import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router'; // Importez Router

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatButtonModule],
})
export class ListEventsComponent {
  displayedColumns: string[] = ['titre', 'description', 'image', 'statusEvent', 'type', 'btn_href', 'btn_name', 'created', 'updated', 'deleted', 'actions'];
  dataSource = new MatTableDataSource<any>();
  errorMessage: string = '';

  constructor(private eventsService: EventsService, private router: Router) {} // Injectez Router

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventsService.getAllEvents().subscribe({
      next: (data) => {
        this.dataSource.data = data.events; // Assurez-vous que `data.events` est correct
      },
      error: (error) => {
        this.errorMessage = 'Error fetching events';
        console.error(error);
      }
    });
  }

  deleteEvent(id: string): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventsService.deleteEvent(id).subscribe({
        next: () => {
          this.loadEvents(); // Rafraîchir la liste après la suppression
        },
        error: (error) => {
          console.error('Error deleting event:', error);
        }
      });
    }
  }

  updateEvent(id: string): void {
    this.router.navigate(['/updateEvents', id]); // Naviguer vers la page de mise à jour avec l'ID de l'événement
  }
}
