import { Component } from '@angular/core';
import { TeamsService, FormService } from './services';
import { NewMemberBlank } from './errors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    public service: TeamsService,
    public form: FormService
  ) {}

  addMember() {
    try {
      this.form.unsetError('newMember');
      this.service.addMember(this.form.newMember);
      this.form.resetNewMember();
    } catch (error) {
      if (error instanceof NewMemberBlank) {
        this.form.setError('newMember', error.message);
      }
    }
  }

  generateTeams() {
    try {
      this.form.unsetError('teams');
      this.service.generateTeams(this.form.numberOfTeams);
      this.form.resetNumberOfTeams();
    } catch (error) {
      if (error instanceof Error) {
        this.form.setError('teams', error.message);
      }
    }
  }
}
