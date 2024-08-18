import { Component, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbarf',
  templateUrl: './navbarf.component.html',
  styleUrls: ['./navbarf.component.scss'],
})
export class NavbarfComponent implements AfterViewInit {
  isScrolled = false;

  constructor() {}

  ngAfterViewInit() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (targetId) {
          const target = document.querySelector(targetId);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 50;
  }
}
