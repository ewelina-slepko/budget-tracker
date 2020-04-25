import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToWallet() {
    this.router.navigate(['/wallet']);
  }

  goToTransactions() {
    this.router.navigate(['/transactions']);
  }

  goToBudgets() {
    this.router.navigate(['/budgets']);
  }
}
