import {animate, style, transition, trigger} from '@angular/animations';

export const formAnimation = [
  trigger('slideUp', [
    transition(':enter', [
      style({transform: 'translateY(100%)', opacity: 0}),
      animate('300ms ease-out', style({transform: 'translateY(0%)', opacity: 1}))
    ]),
  ]),
];
