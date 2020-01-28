import { Injectable } from '@angular/core';
import {CustomNotification, NotificationType, Notifier} from './notifier';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor() { }

  public notifier = new Notifier();

  public notify(message: string, notificationType: NotificationType, duration: number = 8000): void {

    const notification: CustomNotification = new CustomNotification(message, notificationType);

    const dismissWait = () => {
      new Promise<void>((resolve) => setTimeout(resolve, duration)).then(() => {
        this.notifier.destroy(notification);
      });
    };

    this.notifier.add(notification);

    dismissWait();

  }
}
