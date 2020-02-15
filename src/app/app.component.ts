import {Component, OnInit} from '@angular/core';
import {NotifierService} from './shared/components/notifier/notifier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'budget-tracker';

  messageText = 'This is a demo notification, this is a demo notification, this is a demo notification!';
  messageType = '1';


  constructor(private notifierService: NotifierService) {
  }

  ngOnInit() {
  }

  submitMessage() {
    let messageType = 2;

    if (this.messageType.length > 0) {
      messageType = parseInt(this.messageType, 10);
    }
    this.notifierService.notify(
      this.messageText,
      messageType,
      100000000000
    );
  }
}
