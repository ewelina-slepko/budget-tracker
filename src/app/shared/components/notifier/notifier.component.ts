import { Component, OnInit } from '@angular/core';
import {notifierAnimation} from './notifier-animation';
import {NotifierService} from './notifier.service';
import {Notifier} from './notifier';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss'],
  animations: [notifierAnimation]
})
export class NotifierComponent implements OnInit {

  get src(): Notifier {
    return this.notifierService.notifier;
  }

  constructor(private notifierService: NotifierService) { }

  ngOnInit() {
  }

}
