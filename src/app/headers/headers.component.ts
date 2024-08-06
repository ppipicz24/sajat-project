import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.css'
})
export class HeadersComponent {
  // navbar = document.getElementById('navbar');

  // constructor() { }

  // ngOnInit() {
  //   window.addEventListener('scroll', this.scroll, true);
  // }

  // ngOnDestroy(): void {
  //   //Called once, before the instance is destroyed.
  //   //Add 'implements OnDestroy' to the class.
  //   window.removeEventListener('scroll', this.scroll, true);
  // }

  // scroll = (event): void => {
  //   if(window.scrollY > this.navbar.offsetTop) {
  //     this.navbar.classList.add('sticky');
  //   }
  //   else {
  //     this.navbar.classList.remove('sticky');
  //   }
  // }

}
