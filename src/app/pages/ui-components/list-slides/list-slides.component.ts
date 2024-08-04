import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { SlidesService } from 'src/app/services/slides.service';

@Component({
  selector: 'app-list-slides',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatButtonModule],
  templateUrl: './list-slides.component.html',
  styleUrls: ['./list-slides.component.scss']
})
export class ListSlidesComponent implements OnInit {
  displayedColumns: string[] = ['titre', 'description', 'image', 'status', 'btn_href', 'btn_name', 'created', 'updated', 'deleted', 'actions'];
  dataSource = new MatTableDataSource<any>();
  errorMessage: string = '';

  constructor(private slidesService: SlidesService) {}

  ngOnInit(): void {
    this.loadSlides();
  }

  loadSlides(): void {
    this.slidesService.getAllSlides().subscribe({
      next: (data) => {
        this.dataSource.data = data.slides; // Assurez-vous que `data.slides` est correct
      },
      error: (error) => {
        this.errorMessage = 'Error fetching slides';
        console.error(error);
      }
    });
  }

  deleteSlide(id: string): void {
    if (confirm('Are you sure you want to delete this slide?')) {
      this.slidesService.deleteSlide(id).subscribe({
        next: () => {
          this.loadSlides(); // Rafraîchir la liste après la suppression
        },
        error: (error) => {
          console.error('Error deleting slide:', error);
        }
      });
    }
  }
}
