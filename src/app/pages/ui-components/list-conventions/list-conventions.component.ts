import { Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ConventionsService } from 'src/app/services/conventions.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-list-conventions',
  templateUrl: './list-conventions.component.html',
  styleUrls: ['./list-conventions.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatButtonModule, MatIconModule],
})
export class ListConventionsComponent implements OnInit {
  conventions: any[] = [];
  errorMessage: string = '';

  constructor(private conventionsService: ConventionsService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadConventions();
    // Set pdfmake virtual file system
    (pdfMake as any).vfs = (pdfFonts as any).pdfMake.vfs;
  }

  loadConventions(): void {
    this.conventionsService.getAllConventions().subscribe({
      next: (response) => {
        this.conventions = response.conventions;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load conventions. Please try again later.';
        console.error('Error:', error);
      }
    });
  }

  deleteConvention(id: string): void {
    this.conventionsService.deleteConvention(id).subscribe({
      next: () => {
        // Remove deleted convention from local array
        this.conventions = this.conventions.filter(convention => convention._id !== id);
      },
      error: (error) => {
        this.errorMessage = 'Failed to delete convention. Please try again later.';
        console.error('Error:', error);
      }
    });
  }

  generatePdf(convention: any): void {
    const docDefinition = {
      content: [
        { text: 'Convention Details', style: 'header' },
        {
          table: {
            widths: ['*', '*'],
            body: [
              ['Title', convention.titre],
              ['Status', convention.statusConvention],
              ['Date', new Date(convention.date).toLocaleDateString()],
              ['Type', convention.type],
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10] as [number, number, number, number], // Ensure margin has exactly 4 elements
        },
      },
    };

    (pdfMake as any).createPdf(docDefinition).download(`${convention.titre || 'Convention'}.pdf`);
  }

  getSanitizedUrl(base64Data: string): SafeResourceUrl {
    const base64Prefix = 'data:application/pdf;base64,';
    const pdfData = base64Data.startsWith(base64Prefix) ? base64Data : base64Prefix + base64Data;
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfData);
  }
  
  }

