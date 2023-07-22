import { Component } from '@angular/core';
import { TeamsService } from './teams.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  newMember = '';

  constructor(public service: TeamsService) {}

  addMember() {
    this.service.addMember(this.newMember);
    this.resetNewMember();
  }

  updateNewMember(value: string) {
    this.newMember = value;
  }

  private resetNewMember() {
    this.newMember = '';
  }
}
