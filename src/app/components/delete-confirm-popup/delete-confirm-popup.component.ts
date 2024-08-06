import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirm-popup',
  templateUrl: './delete-confirm-popup.component.html',
  styleUrl: './delete-confirm-popup.component.css'
})
export class DeleteConfirmPopupComponent {
  @Input() showPopup: boolean = false;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}


