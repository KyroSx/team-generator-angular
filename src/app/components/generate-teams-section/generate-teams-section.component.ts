import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generate-teams-section',
  templateUrl: './generate-teams-section.component.html',
  styleUrls: ['./generate-teams-section.component.css'],
})
export class GenerateTeamsSectionComponent {
  @Input() numberOfTeams!: number;
  @Input() error!: string;

  @Output() updateNumberOfTeamsEvent = new EventEmitter<number>();
  @Output() generateTeamsEvent = new EventEmitter<void>();

  onUpdateNumberOfTeams(value: number) {
    this.updateNumberOfTeamsEvent.emit(value);
  }

  onGenerateTeams() {
    this.generateTeamsEvent.emit();
  }

  protected readonly Number = Number;
}
