export class Notifier {

  public notifications: CustomNotification[] = [];

  public destroy(notification: CustomNotification): void {
    this.notifications.splice(this.notifications.indexOf(notification), 1);
  }

  public add(notification: CustomNotification): void {
    this.notifications.unshift(notification);
  }
}

export class CustomNotification {

  public message: string;
  public type: NotificationType;

  constructor(message: string, type: NotificationType | null) {
    this.message = message;
    this.type = type;
  }
}

export enum NotificationType {
  Success = 1,
  Fail = 2,
}
