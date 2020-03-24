import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitialSettingsService {

  currentStepSubject = new Subject<string>();

  sendCurrentStepInfo(currentStep) {
    this.currentStepSubject.next(currentStep);
  }

  getCurrentStepInfo(): Observable<string> {
    return this.currentStepSubject.asObservable();
  }
}
