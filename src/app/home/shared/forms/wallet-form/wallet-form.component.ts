import {Component, OnInit} from '@angular/core';
import {Source} from './dtos';
import {Router} from '@angular/router';
import {InitialSettingsService} from '../../../initial-settings/initial-settings.service';
import {basicAnimation} from '../../../../shared/animation';
import {AuthenticationService} from '../../../../authentication/authentication.service';
import {AngularFirestore} from '@angular/fire/firestore';

interface WalletDto {
  name: string;
  amount: string;
  uid: string;
}

@Component({
  selector: 'wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.scss'],
  animations: basicAnimation
})
export class WalletFormComponent implements OnInit {

  source;
  walletCollection;

  sourceNumber = 1;
  sources: Source[];

  constructor(firestore: AngularFirestore,
              private authService: AuthenticationService,
              private router: Router,
              private initialSettingsService: InitialSettingsService) {
    this.source = firestore.collection('source').valueChanges();
    this.walletCollection = firestore.collection('wallet');
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
      .map((object: WalletDto) => ({
        uid: this.authService.currentUser.uid,
        ...object
      }))
      .forEach(element => this.walletCollection.add(element));

    this.router.navigate(['/initialsettings/step2']);
  }

  skipInitialSettings() {
    this.router.navigate(['/dashboard']);
  }
}
