import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
declare var bootstrap: any; // Declare the Bootstrap variable
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {


  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }


  title = 'Arcoverde Soluções e Negócios';
  error: boolean = false;
  success: boolean = false;
  mailForm!: FormGroup;
  message: string = "";
  errorMessagePadrao: string = "Todos os campos são Obrigatórios";


  closeModal() {
    const modal = document.getElementById("modal");
    if (modal) {
      modal.style.display = "none";
    }
  }



  popPolitica() {
    const modal = document.getElementById("modal");
    if (modal) {
      modal.style.display = "block";
    }
  }

  onSubmit(): void {
    if (this.mailForm.valid) {
      this.http.post('mail.php', this.mailForm.value)
      .subscribe({
        next: (response: any) => { 
          if (response.success) {
            this.message = response.message; 
            this.success = true;
            this.mailForm.reset();
          } else {
            this.error = true;
            this.message = response.message + '-' + response.details ; 
          }
        },
        error: (error) => {
          console.error(error);
          this.error = true;
          this.message = 'An error occurred during the request.'; 
        }
      });
    }
  }

  ngOnInit() {
    this.initializeCarousel();
    this.initializeScrollSpy();
    this.setupResponsiveNavToggler();
    this.mailForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      assunto: ['', Validators.required],
      mensagem: ['', Validators.required]
    });
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
