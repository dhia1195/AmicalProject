import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { SlidesService } from 'src/app/services/slides.service';
import { ActivatedRoute } from '@angular/router';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-slides-front',
  templateUrl: './slides-front.component.html',
  styleUrls: ['./slides-front.component.scss']
})
export class SlidesFrontComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['titre', 'description', 'image', 'status'];
  dataSource = new MatTableDataSource<any>();
  errorMessage: string = '';
  currentIndex = 0;
  autoSlideInterval: any;

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  dialogMessage: string = '';
  isSuccess: boolean = true;

  constructor(
    private slidesService: SlidesService,
    private snackBar: MatSnackBar, // Inject MatSnackBar
    private route: ActivatedRoute,
    private reservationVerificationService: ReservationsService
  ) {}

  ngOnInit(): void {
    this.loadSlides();
    this.startAutoSlide();
    this.checkVerificationStatus();
  }

  loadSlides(): void {
    this.slidesService.getAllSlides().subscribe({
      next: (data) => {
        this.dataSource.data = data.slides;
      },
      error: (error: any) => {
        this.errorMessage = 'Error fetching slides';
        console.error(error);
        this.showSnackBar(this.errorMessage, false);
      }
    });
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex > 0) 
      ? this.currentIndex - 1 
      : this.dataSource.data.length - 1;
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex < this.dataSource.data.length - 1) 
      ? this.currentIndex + 1 
      : 0;
  }

  ngOnDestroy(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  showSnackBar(message: string, success: boolean): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: success ? 'success-snackbar' : 'error-snackbar',
    });
  }

  checkVerificationStatus(): void {
    this.route.queryParams.subscribe(params => {
      if (params['status']) {
        const status = params['status'];
        if (status === 'verified') {
          this.showSnackBar('Reservation verified successfully!', true);
        } else if (status === 'error') {
          this.showSnackBar('Error verifying reservation.', false);
        }
      }
    });
  }
}
