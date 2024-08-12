import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SlidesService } from 'src/app/services/slides.service';

@Component({
  selector: 'app-slides-front',
  templateUrl: './slides-front.component.html',
  styleUrls: ['./slides-front.component.scss']
})
export class SlidesFrontComponent implements OnInit {
  displayedColumns: string[] = ['titre', 'description', 'image', 'status'];
  dataSource = new MatTableDataSource<any>();
  errorMessage: string = '';
  currentIndex = 0;
  autoSlideInterval: any;

  constructor(private slidesService: SlidesService) {}

  ngOnInit(): void {
    this.loadSlides();
    this.startAutoSlide();
  }

  loadSlides(): void {
    this.slidesService.getAllSlides().subscribe({
      next: (data) => {
        this.dataSource.data = data.slides; // Ensure `data.slides` is correct
      },
      error: (error) => {
        this.errorMessage = 'Error fetching slides';
        console.error(error);
      }
    });
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Change slide every 3 seconds
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.dataSource.data.length - 1;
    this.updateSlidePosition();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex < this.dataSource.data.length - 1) ? this.currentIndex + 1 : 0;
    this.updateSlidePosition();
  }

  updateSlidePosition() {
    // No need to manually update carousel position
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }
}
