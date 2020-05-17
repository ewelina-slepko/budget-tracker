import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {InitialSettingsService} from './initial-settings.service';

@Component({
  selector: 'initial-settings',
  templateUrl: './initial-settings.component.html',
  styleUrls: ['./initial-settings.component.scss']
})
export class InitialSettingsComponent implements OnInit, AfterViewChecked {

  currentStep: number;

  constructor(private initialSettingsService: InitialSettingsService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.saveCurrentStepInfo();
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  saveCurrentStepInfo() {
    this.initialSettingsService.getCurrentStepInfo().subscribe(res => this.currentStep = res);
  }

  get stepOne() {
    return this.currentStep === 1;
  }

  get stepTwo() {
    return this.currentStep === 2;
  }

  get stepThree() {
    return this.currentStep === 3;
  }
}
