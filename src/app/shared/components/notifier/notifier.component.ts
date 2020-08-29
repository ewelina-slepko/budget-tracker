import {Component} from '@angular/core';
import {notifierAnimation} from './notifier-animation';
import {NotifierService} from './notifier.service';
import {Notifier} from './notifier';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss'],
  animations: [notifierAnimation]
})
export class NotifierComponent {

  constructor(private notifierService: NotifierService) {
  }

  get src(): Notifier {
    return this.notifierService.notifier;
  }
}
