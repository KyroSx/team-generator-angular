import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-member-section',
  templateUrl: './add-member-section.component.html',
  styleUrls: ['./add-member-section.component.css'],
})
export class AddMemberSectionComponent {
  @Input() newMember!: string;
  @Input() error!: string;

  @Output() addNewMemberEvent = new EventEmitter<string>();
  @Output() addEvent = new EventEmitter<void>();

  onAddNewMember(value: string) {
    this.addNewMemberEvent.emit(value);
  }

  onAdd() {
    this.addEvent.emit();
  }
}
