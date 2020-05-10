import {animate, style, transition, trigger} from '@angular/animations';

export const slideAnimation = [
  trigger('slideLeft', [
    transition(':enter', [
      style({transform: 'translateX(100%)', opacity: 0}),
      animate('200ms ease-in', style({transform: 'translateX(0%)', opacity: 1}))
    ]),
  ]),

  trigger('slideRight', [
    transition(':enter', [
      style({transform: 'translateX(-100%)', opacity: 0}),
      animate('200ms ease-in', style({transform: 'translateX(0%)', opacity: 1}))
    ]),
  ])
];
