import {Component, OnInit} from '@angular/core';
import {Source} from './dtos';
import {Router} from '@angular/router';
import {InitialSettingsService} from '../../../initial-settings/initial-settings.service';
import {basicAnimation} from '../../../../shared/animation';
import {AuthenticationService} from '../../../../authentication/authentication.service';

@Component({
  selector: 'wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.scss'],
  animations: basicAnimation
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
      this.router.navigate(['/initialsettings/step2']);
    }
  }

  skipInitialSettings() {
    this.router.navigate(['/dashboard']);
  }
}
