import {animate, style, transition, trigger} from '@angular/animations';

export const cardAnimation = [
  trigger('slideRight', [
    transition(':enter', [
      style({transform: 'translateX(60%)', opacity: 0}),
      animate('140ms ease-in', style({transform: 'translateX(0%)', opacity: 1}))
    ]),
  ]),

  trigger('slideLeft', [
    transition(':enter', [
      style({transform: 'translateX(-60%)', opacity: 0}),
      animate('140ms ease-in', style({transform: 'translateX(0%)', opacity: 1}))
    ]),
  ])
];
