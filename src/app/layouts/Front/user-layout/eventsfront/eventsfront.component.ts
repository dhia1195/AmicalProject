import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-eventsfront',
  templateUrl: './eventsfront.component.html',
  styleUrls: ['./eventsfront.component.scss']
})
export class EventsfrontComponent {

  displayedColumns: string[] = ['titre', 'description', 'image', 'statusEvent', 'type', 'btn_href', 'btn_name'];
  dataSource = new MatTableDataSource<any>();
  errorMessage: string = '';

  constructor(private eventsService: EventsService, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventsService.getAllEvents().subscribe({
      next: (data) => {
        this.dataSource.data = data.events; 
      },
      error: (error) => {
        this.errorMessage = 'Error fetching events';
        console.error(error);
      }
    });
  }

  reserveEvent(eventId: string): void {
    this.router.navigate(['/front/reserve'], { queryParams: { eventId } });
  }

  viewEventDetails(eventId: string): void {
    this.router.navigate(['/front/event-details', eventId]);
  }
}
