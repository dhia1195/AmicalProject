import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-addreservation',
  templateUrl: './addreservation.component.html',
  styleUrls: ['./addreservation.component.scss']
})
export class AddreservationComponent implements OnInit {
  reservationForm: FormGroup;
  successMessage: string;
  errorMessage: string;
  eventId: string;

  constructor(
    private fb: FormBuilder,
    private reservationsService: ReservationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.reservationForm = this.fb.group({
      matricule: ['', Validators.required],
      date: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      post: ['', Validators.required],
      numtel: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      email: ['', [Validators.required, Validators.email]],
      event: ['']  // Initially empty, will be set from route parameter
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.eventId = params['eventId'];
      if (this.eventId) {
        this.reservationForm.patchValue({ event: this.eventId });
      }
      console.log('Event ID:', this.eventId); 
    });
  }
  

  onSubmit(): void {
    if (this.reservationForm.invalid) {
      return;
    }
    const confirmation = window.confirm('Are you sure you want to make this reservation?');
    if (!confirmation) {
      return; 
    }
    console.log('Form Value:', this.reservationForm.value); 
  
    this.reservationsService.reserveEvent(this.reservationForm.value)
      .subscribe(
        response => {
          this.successMessage = 'Reservation added successfully!';
          this.reservationForm.reset();
          this.router.navigate(['/front/eventsf']); 
        },
        error => {
          this.errorMessage = 'Failed to add reservation.';
          console.error('Error:', error); 
        }
      );
  }
  
}
