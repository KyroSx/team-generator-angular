import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Value, Type } from './input.component.types';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() value: Value = '';
  @Input() error = '';
  @Input() error_id? = '';

  @Input() placeholder? = '';
  @Input() type?: Type = 'text';

  @Output() inputEvent = new EventEmitter<Value>();

  onInput(value: Value) {
    this.inputEvent.emit(value);
  }
}
