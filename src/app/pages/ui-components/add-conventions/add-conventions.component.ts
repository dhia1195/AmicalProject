import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConventionsService } from 'src/app/services/conventions.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-conventions',
  templateUrl: './add-conventions.component.html',
  styleUrls: ['./add-conventions.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class AddConventionsComponent {
  conventions: any[] = [];
  conventionForm: FormGroup;
  errorMessage: string = '';
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private conventionsService: ConventionsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.conventionForm = this.fb.group({
      titre: ['', Validators.required],
      status: [true, Validators.required],
      date: ['', Validators.required],
      image: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchConventions();
  }

  fetchConventions(): void {
    this.conventionsService.getAllConventions().subscribe(
      (data: any) => {
        this.conventions = data.conventions; // Ensure this matches the server response
      },
      (error: any) => {
        console.error('Error fetching conventions:', error);
        this.errorMessage = 'Error fetching conventions';
        alert(this.errorMessage);
      }
    );
  }

  ajouterConvention(): void {
    if (this.conventionForm.valid) {
      const formValue = this.conventionForm.value;
      const status = formValue.status ? 'active' : 'inactive';
      const newConvention = { ...formValue, status };

      this.conventionsService.ajouterConvention(newConvention).subscribe(
        (data: any) => {
          console.log('Data received from server:', data);
          if (data && data.conventions) { // Adjust based on actual response
            this.conventions.push(data.conventions);
            this.conventionForm.reset();
            alert('Convention added successfully!');
            this.router.navigate(['/ListConventions']); // Navigate to the list or another page if needed
          } else {
            this.errorMessage = 'Unexpected response format from server.';
            alert(this.errorMessage);
          }
        },
        (error: any) => {
          console.error('Error adding convention:', error);
          this.errorMessage = 'Error adding convention';
          alert(this.errorMessage);
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields';
      alert(this.errorMessage);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;  // URL de données de l'image
        this.conventionForm.patchValue({
          image: reader.result as string  // Assurez-vous que c'est bien une chaîne
        });
      };
      reader.readAsDataURL(file);  // Lire le fichier et obtenir l'URL de données
    }
  }
}
