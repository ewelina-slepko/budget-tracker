import {Component} from '@angular/core';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  slides = [
    'assets/landing-page/1.jpg',
    'assets/landing-page/2.jpg',
    'assets/landing-page/3.jpg',
    'assets/landing-page/1.jpg',
    'assets/landing-page/2.jpg',
    'assets/landing-page/3.jpg'
  ];

}
