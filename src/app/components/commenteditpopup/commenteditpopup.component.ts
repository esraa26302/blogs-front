import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-commenteditpopup',
  templateUrl: './commenteditpopup.component.html',
  styleUrl: './commenteditpopup.component.css'
})
export class CommenteditpopupComponent {
  @Input() showPopup: boolean = false;
  @Input() commentContent: string = '';
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  @Output() onSave: EventEmitter<string> = new EventEmitter();

  closePopup() {
    this.onClose.emit();
  }

  saveChanges() {
    this.onSave.emit(this.commentContent);
  }
}


