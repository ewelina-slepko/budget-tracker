import { Component, OnInit } from '@angular/core';

export const navBarElementsDict = [
  {
    name: 'Timeline',
    path: 'timeline'
  },
  {
    name: 'Budget',
    path: 'budget'
  },
  {
    name: 'Activity',
    path: 'activity'
  }
];

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  navBarElements = navBarElementsDict;
  constructor() { }

  ngOnInit() {
  }

}
