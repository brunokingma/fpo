import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
declare var bootstrap: any; // Declare the Bootstrap variable

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  popPolitica() {
    throw new Error('Method not implemented.');
  }

  title = 'fpo';
  ngOnInit() {
    this.initializeCarousel();
    this.initializeScrollSpy();
    this.setupResponsiveNavToggler();
  }
  private initializeCarousel() {
    let items = document.querySelectorAll('.carousel .carousel-item')

    items.forEach((el) => {
      const minPerSlide = 4
      let next = el.nextElementSibling
      for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
          // wrap carousel by using first child
          next = items[0]
        }
        let cloneChild = next.cloneNode(true) as HTMLElement;
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
      }
    })


  }
  private initializeScrollSpy() {
    const mainNav: HTMLElement | null = document.body.querySelector('#mainNav');

    if (mainNav) {
      mainNav.setAttribute('data-bs-spy', 'scroll');
      mainNav.setAttribute('data-bs-target', '#mainNav');
      mainNav.setAttribute('data-bs-offset', '74');

      // Activate ScrollSpy
      new bootstrap.ScrollSpy(mainNav);
    }
  }

  private setupResponsiveNavToggler() {
    const navbarToggler: HTMLElement | null = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems: NodeListOf<HTMLElement> = document.querySelectorAll('#navbarResponsive .nav-link');

    responsiveNavItems.forEach((responsiveNavItem) => {
      responsiveNavItem.addEventListener('click', () => {
        if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
          navbarToggler.click();
        }
      });
    });
  }
}
