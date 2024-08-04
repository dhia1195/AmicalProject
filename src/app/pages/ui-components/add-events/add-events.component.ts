import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class AddEventsComponent {
  eventForm: FormGroup;
  errorMessage: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  typeOptions: string[] = ['hotel', 'croisiere'];  // Define your options here

  constructor(
    private eventsService: EventsService,
    private fb: FormBuilder
  ) {
    this.eventForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      image: ['', Validators.required],  // URL de l'image, initialisé plus tard
      dateD: ['', [Validators.minLength(3), Validators.required]],
      dateF: ['', [Validators.minLength(3), Validators.required]],
      btn_href: ['', Validators.required],
      btn_name: ['', Validators.required],
      statusEvent: [true, Validators.required]  // Default status to true (active)
    });
  }

  addEvent(): void {
    if (this.eventForm.valid) {
      const newEvent = this.eventForm.value;
      this.eventsService.addEvent(newEvent).subscribe(
        (data: any) => {
          console.log('Data received from server:', data);
          if (data && data.eventr) {
            this.eventForm.reset();
            alert('Event added successfully!');  // Alerte de succès
          } else {
            this.errorMessage = 'Unexpected response format from server.';
            alert(this.errorMessage);  // Affiche l'erreur
          }
        },
        (error: any) => {
          console.error('Error adding event:', error);
          this.errorMessage = 'Error adding event';
          alert(this.errorMessage);  // Affiche l'erreur
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields';
      alert(this.errorMessage);  // Affiche l'erreur
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
