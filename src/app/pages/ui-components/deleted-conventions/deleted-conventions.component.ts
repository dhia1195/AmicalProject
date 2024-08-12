import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ConventionsService } from 'src/app/services/conventions.service';

@Component({
  selector: 'app-deleted-conventions',
  templateUrl: './deleted-conventions.component.html',
  styleUrls: ['./deleted-conventions.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
})
export class DeletedConventionsComponent implements OnInit {
  deletedConventions: any[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private conventionsService: ConventionsService) {}

  ngOnInit(): void {
    this.loadDeletedConventions();
  }

  loadDeletedConventions(): void {
    this.loading = true;
    this.conventionsService.getDeletedConventions().subscribe({
      next: (response) => {
        console.log('API Response:', response);
        // Adjust according to the actual response structure
        if (Array.isArray(response)) {
          this.deletedConventions = response; // If the response is directly an array
        } else if (response && Array.isArray(response.conventions)) {
          this.deletedConventions = response.conventions; // If the response contains 'conventions' key
        } else {
          console.warn('Unexpected response structure:', response);
          this.deletedConventions = [];
        }
        console.log('Deleted Conventions:', this.deletedConventions);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load deleted conventions';
        this.loading = false;
        console.error(err);
      }
    });
  }

  restoreConvention(id: string): void {
    this.conventionsService.restoreConvention(id).subscribe({
      next: (response) => {
        this.deletedConventions = this.deletedConventions.filter(convention => convention._id !== id);
      },
      error: (err) => {
        this.error = 'Failed to restore convention';
        console.error(err);
      }
    });
  }
}
