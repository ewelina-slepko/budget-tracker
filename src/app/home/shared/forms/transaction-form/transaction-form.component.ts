import {Component} from '@angular/core';
import {basicAnimation} from '../../../../shared/animation';
import {PanelService} from '../../../panel/panel.service';

@Component({
  selector: 'transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  animations: basicAnimation
})
export class TransactionFormComponent {

  constructor(private panelService: PanelService) {
  }

  closeNewTransactionForm() {
    this.panelService.sendNewTransactionFormStatus(false);
  }
}
