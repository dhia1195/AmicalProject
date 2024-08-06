import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SlidesService } from 'src/app/services/slides.service';

@Component({
  selector: 'app-update-slides',
  templateUrl: './update-slides.component.html',
  styleUrls: ['./update-slides.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule
  ],
})
export class UpdateSlidesComponent implements OnInit {
  slideForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  errorMessage: string = '';
  slideId: string = '';

  constructor(
    private fb: FormBuilder,
    private slidesService: SlidesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.slideForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      btn_href: ['', Validators.required],
      btn_name: ['', Validators.required],
      status: [true, Validators.required],  // Default status to true (active)
    });
  }

  ngOnInit(): void {
    this.slideId = this.route.snapshot.paramMap.get('id') || '';
    if (this.slideId) {
      this.getSlideById(this.slideId);
    }
  }

  getSlideById(id: string): void {
    this.slidesService.getSlideById(id).subscribe({
      next: (data: any) => {
        console.log(data);  // Inspect the received data
        if (data) {
          this.slideForm.patchValue(data);
          this.imagePreview = data.image || null;
        } else {
          this.errorMessage = 'Slide not found';
          console.error(this.errorMessage);
        }
      },
      error: (error) => {
        this.errorMessage = 'Error fetching slide';
        console.error(error);
      }
    });
  }

  updateSlide(): void {
    if (this.slideForm.valid) {
      const updatedSlide = this.slideForm.value;
      this.slidesService.updateSlide(this.slideId, updatedSlide).subscribe({
        next: (data: any) => {
          if (data) {
            this.router.navigate(['/ListeSlides']);
          } else {
            this.errorMessage = 'Unexpected response format from server.';
            console.error(this.errorMessage);
          }
        },
        error: (error) => {
          this.errorMessage = 'Error updating slide';
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
        this.imagePreview = reader.result;  // Image data URL
        this.slideForm.patchValue({
          image: reader.result  // Update the form with data URL
        });
      };
      reader.readAsDataURL(file);  // Read file and get data URL
    }
  }
}
