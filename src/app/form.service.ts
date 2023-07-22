import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  newMember = '';
  errors = { newMember: false };

  updateNewMember(value: string) {
    this.newMember = value;
  }

  setError(field: keyof typeof this.errors) {
    this.errors[field] = true;
  }

  unsetError(field: keyof typeof this.errors) {
    this.errors[field] = false;
  }

  resetNewMember() {
    this.newMember = '';
  }
}
