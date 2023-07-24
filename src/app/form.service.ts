import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  newMember = '';
  numberOfTeams = 0;
  errors = { newMember: false, teams: false };

  updateNewMember(value: string) {
    this.newMember = value;
  }

  updateNumberOfTeams(number: string) {
    this.numberOfTeams = Number(number);
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
