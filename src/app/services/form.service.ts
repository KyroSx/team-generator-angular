import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  newMember = '';
  numberOfTeams = 0;
  errors = {
    newMember: '',
    teams: '',
  };

  updateNewMember(value: string) {
    this.newMember = value;
  }

  updateNumberOfTeams(number: number) {
    this.numberOfTeams = number;
  }

  setError(field: keyof typeof this.errors, message: string) {
    this.errors[field] = message;
  }

  unsetError(field: keyof typeof this.errors) {
    this.errors[field] = '';
  }

  resetNewMember() {
    this.newMember = '';
  }

  resetNumberOfTeams() {
    this.numberOfTeams = 0;
  }
}
