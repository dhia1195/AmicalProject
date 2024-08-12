import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbarf',
  templateUrl: './navbarf.component.html',
  styleUrls: ['./navbarf.component.scss'],
})
export class NavbarfComponent {
  isScrolled = false;

  constructor(private router: Router) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 50;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
