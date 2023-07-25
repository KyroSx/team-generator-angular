import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-teams-section',
  templateUrl: './teams-section.component.html',
  styleUrls: ['./teams-section.component.css'],
})
export class TeamsSectionComponent {
  @Input() teams!: string[][];

  formatMembers(team: string[]) {
    return team.join(', ');
  }
}
