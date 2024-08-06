import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-deleted-events',
  templateUrl: './deleted-events.component.html',
  styleUrls: ['./deleted-events.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatButtonModule, MatIconModule],
})
export class DeletedEventsComponent {
  displayedColumns: string[] = ['titre', 'description', 'image', 'statusEvent', 'type', 'btn_href', 'btn_name', 'created', 'updated', 'deleted', 'actions'];
  dataSource = new MatTableDataSource<any>();
  errorMessage: string = '';

  constructor(private eventsService: EventsService, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventsService.getDeletedEvents().subscribe({
      next: (data) => {
        console.log(data); // Vérifiez les données ici
        this.dataSource.data = data.events || data; // Assurez-vous que la clé est correcte
      },
      error: (error) => {
        this.errorMessage = 'Error fetching events';
        console.error(error);
      }
    });
  }
  
  
  restoreEvent(id: string): void {
    if (confirm('Are you sure you want to restore this event?')) {
      this.eventsService.restoreEvent(id).subscribe({
        next: () => {
          this.loadEvents(); // Rafraîchir la liste après la restauration
        },
        error: (error) => {
          console.error('Error restoring event:', error);
        }
      });
    }
  }
}
