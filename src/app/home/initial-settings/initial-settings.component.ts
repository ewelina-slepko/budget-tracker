import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {InitialSettingsService} from './initial-settings.service';

@Component({
  selector: 'initial-settings',
  templateUrl: './initial-settings.component.html',
  styleUrls: ['./initial-settings.component.scss']
})
export class InitialSettingsComponent implements OnInit, AfterViewInit {

  currentStep: number;

  constructor(private initialSettingsService: InitialSettingsService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.saveCurrentStepInfo();
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  saveCurrentStepInfo() {
    this.initialSettingsService.getCurrentStepInfo().subscribe(res => this.currentStep = res);
  }
}
