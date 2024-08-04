import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-update-events',
  templateUrl: './update-events.component.html',
  styleUrls: ['./update-events.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule],
})
export class UpdateEventsComponent {
  eventForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  errorMessage: string = '';
  eventId: string = '';
  typeOptions: string[] = ['Hotel', 'Cruise'];  // Ajoutez vos options ici

  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      image: [''],
      dateD: ['', Validators.required],
      dateF: ['', Validators.required],
      btn_href: ['', Validators.required],
      btn_name: ['', Validators.required],
      status: [true, Validators.required],  // Default status to true (active)
    });
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id') || '';
    if (this.eventId) {
      this.getEventById(this.eventId);
    }
  }

  getEventById(id: string): void {
    this.eventsService.getEventById(id).subscribe({
      next: (data: any) => {
        console.log(data);  // Inspectez la réponse reçue
        if (data) {
          this.eventForm.patchValue(data);
          this.imagePreview = data.image || null;
        } else {
          this.errorMessage = 'Event not found';
          console.error(this.errorMessage);
        }
      },
      error: (error) => {
        this.errorMessage = 'Error fetching event';
        console.error(error);
      }
    });
  }

  updateEvent(): void {
    if (this.eventForm.valid) {
      const updatedEvent = this.eventForm.value;
      this.eventsService.updateEvent(this.eventId, updatedEvent).subscribe({
        next: (data: any) => {
          if (data) {
            this.router.navigate(['/ListeEvents']);
          } else {
            this.errorMessage = 'Unexpected response format from server.';
            console.error(this.errorMessage);
          }
        },
        error: (error) => {
          this.errorMessage = 'Error updating event';
          console.error(error);
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields';
      console.error(this.errorMessage);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;  // URL de données de l'image
        this.eventForm.patchValue({
          image: reader.result  // Mettre à jour le formulaire avec l'URL de données
        });
      };
      reader.readAsDataURL(file);  // Lire le fichier et obtenir l'URL de données
    }
  }
}
