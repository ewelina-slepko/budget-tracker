import {Component, OnDestroy, OnInit} from '@angular/core';
import {PanelService} from './panel.service';
import {Subscription} from 'rxjs';
import {formAnimation} from '../../shared/animations/form-animation';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  animations: formAnimation
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
