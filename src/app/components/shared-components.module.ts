import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMemberSectionComponent } from './add-member-section/add-member-section.component';
import { MembersListComponent } from './members-list/members-list.component';
import { GenerateTeamsSectionComponent } from './generate-teams-section/generate-teams-section.component';
import { TeamsSectionComponent } from './teams-section/teams-section.component';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [
    AddMemberSectionComponent,
    MembersListComponent,
    GenerateTeamsSectionComponent,
    TeamsSectionComponent,
    InputComponent,
  ],
  imports: [CommonModule],
  exports: [
    AddMemberSectionComponent,
    MembersListComponent,
    GenerateTeamsSectionComponent,
    TeamsSectionComponent,
  ],
})
export class SharedComponentsModule {}
