import {Component, OnInit} from '@angular/core';
import {Source, WalletDto} from './dtos';
import {Router} from '@angular/router';
import {InitialSettingsService} from '../../../initial-settings/initial-settings.service';
import {basicAnimation} from '../../../../shared/animations/basic-animation';
import {AuthenticationService} from '../../../../authentication/authentication.service';
import {ApiService} from '../../../../shared/services/api.service';

@Component({
  selector: 'wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.scss'],
  animations: basicAnimation
})
export class WalletFormComponent implements OnInit {

  sourceNumber = 1;
  sources: Source[];

  constructor(private authService: AuthenticationService,
              private apiService: ApiService,
              private router: Router,
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
    if (form.form.status !== 'VALID') {
      return;
    }
    Object.values(form.form.value)
      .map(({amount, ...rest}) => (
        {
          uid: this.authService.currentUser.uid,
          amount: +amount,
          ...rest
        }
      )).forEach(element => this.apiService.addWalletSource(element).then(() => this.router.navigate(['/initialsettings/step2'])));
  }

  skipInitialSettings() {
    this.router.navigate(['/dashboard']);
  }
}
