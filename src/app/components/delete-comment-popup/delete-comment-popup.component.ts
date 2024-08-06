import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-comment-popup',
  templateUrl: './delete-comment-popup.component.html',
  styleUrls: ['./delete-comment-popup.component.css']
})
export class DeleteCommentPopupComponent {
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
