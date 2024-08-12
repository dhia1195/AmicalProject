import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConventionsService } from 'src/app/services/conventions.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-conventionsfront',
  templateUrl: './conventionsfront.component.html',
  styleUrls: ['./conventionsfront.component.scss']
})
export class ConventionsfrontComponent {
  displayedColumns: string[] = ['titre', 'status', 'date', 'type', 'pdf'];
  dataSource = new MatTableDataSource<any>();
  errorMessage: string = '';

  constructor(private conventionsService: ConventionsService, private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadConventions();
  }

  loadConventions(): void {
    this.conventionsService.getAllConventions().subscribe({
      next: (data) => {
        this.dataSource.data = data.conventions.map(convention => ({
          ...convention,
          sanitizedImage: this.getSanitizedUrl(convention.image) // Cache sanitized URL
        }));
      },
      error: (error) => {
        this.errorMessage = 'Error fetching conventions';
        console.error(error);
      }
    });
  }

  getSanitizedUrl(base64Data: string): SafeResourceUrl {
    const base64Prefix = 'data:application/pdf;base64,';
    const pdfData = base64Data.startsWith(base64Prefix) ? base64Data : base64Prefix + base64Data;
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfData);
  }

  trackById(index: number, item: any): string {
    return item._id; // Use a unique identifier for tracking
  }
}
