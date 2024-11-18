import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild('matDrawerContent', { static: false }) private matDrawerContent: ElementRef | undefined;

  constructor(private router: Router) {}
  
  ngAfterViewInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.scrollToTop();
    });
  }

  scrollToTop() {
    try {
      const element = this.matDrawerContent?.nativeElement || document.querySelector('mat-drawer-content') || document.querySelector('mat-sidenav-content');
      if (element) {
        if ('scrollBehavior' in document.documentElement.style) {
          // Pour les navigateurs qui supportent le défilement fluide
          element.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        } else {
          // Fallback pour les navigateurs qui ne supportent pas le défilement fluide
          element.scrollTop = 0;
        }
      }
    } catch(err) {
      console.error('Erreur lors du défilement:', err);
    }
  }
  
  toggleSidenav() {
    this.sidenav.toggle();
  }

  
}