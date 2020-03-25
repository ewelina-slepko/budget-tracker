import {Component, OnInit,} from '@angular/core';
import {InitialSettingsService} from './initial-settings.service';

@Component({
  selector: 'initial-settings',
  templateUrl: './initial-settings.component.html',
  styleUrls: ['./initial-settings.component.scss']
})
export class InitialSettingsComponent implements OnInit {

  currentStep: number;

  constructor(private initialSettingsService: InitialSettingsService) {
  }

  ngOnInit() {
    this.saveCurrentStepInfo();
  }

  saveCurrentStepInfo() {
    this.initialSettingsService.getCurrentStepInfo().subscribe(res => this.currentStep = res);
  }
}
