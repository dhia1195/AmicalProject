import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SlidesService } from 'src/app/services/slides.service';

@Component({
  selector: 'app-add-slides',
  templateUrl: './add-slides.component.html',
  styleUrls: ['./add-slides.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class AddSlidesComponent implements OnInit {
  slides: any[] = [];
  slideForm: FormGroup;
  errorMessage: string = '';
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private slidesService: SlidesService,
    private fb: FormBuilder
  ) {
    this.slideForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],  // URL de l'image, initialisé plus tard
      btn_href: ['', Validators.required],
      btn_name: ['', Validators.required],
      status: [true, Validators.required]  // Default status to true (active)
    });
  }

  ngOnInit(): void {
    this.fetchSlides();
  }

  fetchSlides(): void {
    this.slidesService.getAllSlides().subscribe(
      (data: any) => {
        this.slides = data.slides; // Assurez-vous que `data.slides` est correct
      },
      (error: any) => {
        console.error('Error fetching slides:', error);
        this.errorMessage = 'Error fetching slides';
        alert(this.errorMessage);  // Affiche l'erreur
      }
    );
  }

  addSlide(): void {
    if (this.slideForm.valid) {
      const newSlide = this.slideForm.value;
      this.slidesService.addSlide(newSlide).subscribe(
        (data: any) => {
          console.log('Data received from server:', data);
          if (data && data.slider) {
            this.slides.push(data.slider);
            this.slideForm.reset();
            alert('Slide added successfully!');  // Alerte de succès
          } else {
            this.errorMessage = 'Unexpected response format from server.';
            alert(this.errorMessage);  // Affiche l'erreur
          }
        },
        (error: any) => {
          console.error('Error adding slide:', error);
          this.errorMessage = 'Error adding slide';
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
        this.slideForm.patchValue({
          image: reader.result  // Mettre à jour le formulaire avec l'URL de données
        });
      };
      reader.readAsDataURL(file);  // Lire le fichier et obtenir l'URL de données
    }
  }
}
