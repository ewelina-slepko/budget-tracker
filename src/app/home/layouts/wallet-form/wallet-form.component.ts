import {Component, OnInit} from '@angular/core';
import {Source} from './dtos';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.scss']
})
export class WalletFormComponent implements OnInit {

  sourceNumber = 1;
  sources: Source[];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.sources = [{
      id: this.sourceNumber,
      name: 'Cash',
      isEditMode: false,
    }];
  }

  saveBalance(form) {
    if (form.form.status === 'VALID') {
      this.router.navigate(['/user/initialsettings/step2']);
    }
  }

  addSource() {
    this.sources.push({
      id: ++this.sourceNumber,
      name: 'Card',
      isEditMode: false
    });
  }
}
