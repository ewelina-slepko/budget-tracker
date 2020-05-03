import {Component, OnInit} from '@angular/core';
import {basicAnimation} from '../../../../shared/animation';
import {AuthenticationService} from '../../../../authentication/authentication.service';
import {ApiService} from '../../../../shared/services/api.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: basicAnimation
})
export class DashboardComponent implements OnInit {

  userName: string;
  totalAmountOfMoney: number;

  constructor(private authService: AuthenticationService,
              private apiService: ApiService) {
  }

  ngOnInit() {
    this.userName = this.authService.currentUser.displayName;
    this.getWalletList();
  }

  getWalletList() {
    this.apiService.getWalletList().subscribe((res) => {
      this.totalAmountOfMoney = res.reduce((a, b) => a + b.amount, 0);
    });
  }


}
