import {Component, OnInit} from '@angular/core';
import {Source} from './dtos';
import {ActivatedRoute, Router} from '@angular/router';
import {InitialSettingsService} from '../../cards/initial-settings/initial-settings.service';

@Component({
  selector: 'wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.scss']
})
export class WalletFormComponent implements OnInit {

  sourceNumber = 1;
  sources: Source[];

  constructor(private router: Router,
              private initialSettingsService: InitialSettingsService) {
  }

  ngOnInit() {
    this.sendCurrentStepInfo();
    this.setInitialSource();
  }

  sendCurrentStepInfo() {
    this.initialSettingsService.sendCurrentStepInfo(1);
  }

  setInitialSource() {
    this.sources = [{
      id: this.sourceNumber,
      name: 'Cash',
      isEditMode: false,
    }];
  }

  addSource() {
    this.sources.push({
      id: ++this.sourceNumber,
      name: 'Card',
      isEditMode: false
    });
  }

  saveBalance(form) {
    if (form.form.status === 'VALID') {
      console.log(form.form.value);
      this.router.navigate(['/user/initialsettings/step2']);
    }
  }
}
