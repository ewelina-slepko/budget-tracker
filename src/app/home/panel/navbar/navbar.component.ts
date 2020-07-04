import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PanelService} from '../panel.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router: Router,
              private panelService: PanelService) {
  }

  goTo(navigation) {
    this.router.navigate([`/${navigation}`]);
  }

  openNewTransactionForm() {
    this.panelService.sendFormStatus(true);
  }
}
