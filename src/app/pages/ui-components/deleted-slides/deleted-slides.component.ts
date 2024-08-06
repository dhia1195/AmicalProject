import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { SlidesService } from 'src/app/services/slides.service';

@Component({
  selector: 'app-deleted-slides',
  templateUrl: './deleted-slides.component.html',
  styleUrls: ['./deleted-slides.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatButtonModule, MatIconModule],
})
export class DeletedSlidesComponent {
  displayedColumns: string[] = ['titre', 'description', 'image', 'status', 'btn_href', 'btn_name', 'created', 'updated', 'deleted', 'actions'];
  dataSource = new MatTableDataSource<any>();
  errorMessage: string = '';

  constructor(private slidesService: SlidesService, private router: Router) {}

  ngOnInit(): void {
    this.loadSlides();
  }

  loadSlides(): void {
    this.slidesService.getDeletedSlides().subscribe({
      next: (data) => {
        this.dataSource.data = data.slides; // Assurez-vous que `data.slides` est correct
      },
      error: (error) => {
        this.errorMessage = 'Error fetching slides';
        console.error(error);
      }
    });
  }

  restoreSlide(id: string): void {
    if (confirm('Are you sure you want to restore this slide?')) {
      this.slidesService.restoreSlide(id).subscribe({
        next: () => {
          this.loadSlides(); // Rafraîchir la liste après la restauration
        },
        error: (error) => {
          console.error('Error restoring slide:', error);
      }
    });
  }
  }}
