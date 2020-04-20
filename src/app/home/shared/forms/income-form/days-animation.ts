import {animate, style, transition, trigger} from '@angular/animations';

export const daysAnimation = [
  trigger('slideTop', [
    transition(':enter', [
      style({transform: 'translateY(30%)', opacity: 0.5}),
      animate('100ms ease-in', style({transform: 'translateX(0%)', opacity: 1}))
    ]),
  ]),

  trigger('slideBottom', [
    transition(':enter', [
      style({transform: 'translateY(-30%)', opacity: 0.5}),
      animate('100ms ease-in', style({transform: 'translateX(0%)', opacity: 1}))
    ]),
  ])
];
