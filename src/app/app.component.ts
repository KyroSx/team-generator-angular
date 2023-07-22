import { Component } from '@angular/core';
import { TeamsService } from './teams.service';
import { NewMemberBlank } from './errors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  newMember = '';
  errors = { newMember: false };

  constructor(public service: TeamsService) {}

  addMember() {
    this.unsetError('newMember');
    try {
      this.service.addMember(this.newMember);
      this.resetNewMember();
    } catch (error) {
      if (error instanceof NewMemberBlank) {
        this.setError('newMember');
      }
    }
  }

  updateNewMember(value: string) {
    this.newMember = value;
  }

  private setError(field: keyof typeof this.errors) {
    this.errors[field] = true;
  }

  private unsetError(field: keyof typeof this.errors) {
    this.errors[field] = false;
  }

  private resetNewMember() {
    this.newMember = '';
  }
}
