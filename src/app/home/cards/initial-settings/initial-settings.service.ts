import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitialSettingsService {

  currentStepSubject = new Subject<number>();

  sendCurrentStepInfo(currentStep) {
    this.currentStepSubject.next(currentStep);
  }

  getCurrentStepInfo(): Observable<number> {
    return this.currentStepSubject.asObservable();
  }
}
