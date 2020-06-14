import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsStatisticsComponent } from './budgets-statistics.component';

describe('BudgetsStatisticsComponent', () => {
  let component: BudgetsStatisticsComponent;
  let fixture: ComponentFixture<BudgetsStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetsStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
