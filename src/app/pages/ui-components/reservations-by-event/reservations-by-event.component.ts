import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-reservations-by-event',
  templateUrl: './reservations-by-event.component.html',
  styleUrls: ['./reservations-by-event.component.scss']
})
export class ReservationsByEventComponent implements OnInit {
  reservations: any[] = [];
  eventId: string = '';

  constructor(
    private route: ActivatedRoute,
    private reservationsService: ReservationsService
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id')!;
    this.getReservationsByEventId();
  }

  getReservationsByEventId(): void {
    this.reservationsService.getReservationsByEventId(this.eventId).subscribe({
      next: (data) => {
        this.reservations = data;
      },
      error: (error) => {
        console.error('Error fetching reservations:', error);
      }
    });
  }
}
