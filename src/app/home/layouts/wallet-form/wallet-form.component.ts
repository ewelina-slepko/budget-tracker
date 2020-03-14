import {Component, OnInit} from '@angular/core';
import {Source} from './dtos';

@Component({
  selector: 'wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.scss']
})
export class WalletFormComponent implements OnInit {

  sourceNumber = 1;
  sources: Source[];

  ngOnInit() {
    this.sources = [{
      id: this.sourceNumber,
      name: 'Cash',
      isEditMode: false,
    }];
  }

  saveBalance(form) {
    console.log(form.form.value);
  }

  addSource() {
    this.sources.push({
      id: ++this.sourceNumber,
      name: 'Card',
      isEditMode: false
    });
  }
}
