import {Component, OnDestroy, OnInit} from '@angular/core';
import {PanelService} from './panel.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, OnDestroy {

  newTransactionFormStatusSubscription: Subscription;
  isNewTransactionFormOpen = false;

  constructor(private panelService: PanelService) {
  }

  ngOnInit() {
    this.newTransactionFormStatusSubscription = this.panelService.getTransactionFormStatus()
      .subscribe(res => this.isNewTransactionFormOpen = res);
  }

  ngOnDestroy() {
    this.newTransactionFormStatusSubscription.unsubscribe();
  }
}
