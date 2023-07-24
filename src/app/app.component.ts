import { Component } from '@angular/core';
import { TeamsService } from './teams.service';
import { NewMemberBlank } from './errors';
import { FormService } from './form.service';

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
    this.form.unsetError('newMember');
    try {
      this.service.addMember(this.form.newMember);
      this.form.resetNewMember();
    } catch (error) {
      if (error instanceof NewMemberBlank) {
        this.form.setError('newMember');
      }
    }
  }

  generateTeams() {
    try {
      this.service.generateTeams(this.form.numberOfTeams);
    } catch (error) {
      this.form.setError('teams');
    }
  }
}
