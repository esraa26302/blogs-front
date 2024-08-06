import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-user-popup',
  templateUrl: './delete-user-popup.component.html',
  styleUrls: ['./delete-user-popup.component.css']
})
export class DeleteUserPopupComponent {
  @Input() showPopup: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  onConfirm() {
    this.onDelete.emit();
    this.onClose.emit();
  }

  onCancel() {
    this.onClose.emit();
  }
}
