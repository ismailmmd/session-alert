export class SessionDialogueModal {
  title: string;
  message: string;
  showCancel = false;
  confirmText = 'Ok';
  cancelText = 'Cancel';
  closeOnTrigger = false;

  constructor(title: string, message: string, showCancel?: boolean, confirmText?: string, cancelText?: string, closeOnTrigger?: boolean) {
    this.title = title;
    this.message = message;
    this.showCancel = showCancel ? showCancel : this.showCancel;
    this.confirmText = confirmText ? confirmText : this.confirmText;
    this.cancelText = cancelText ? cancelText : this.cancelText;
    this.closeOnTrigger = closeOnTrigger ? closeOnTrigger : this.closeOnTrigger;
  }
}
