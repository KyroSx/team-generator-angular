import { Injectable } from '@angular/core';
import {
  NewMemberBlank,
  NoEnoughMembers,
  NumberOfTeamsBellowThanOrZero,
} from '../errors';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  members: string[] = [];
  teams: string[][] = [];

  addMember(member: string) {
    this.validateMember(member);
    this.members.push(member);
  }

  generateTeams(numberOfTeams: number) {
    this.validateTeamGeneration(numberOfTeams);
    this.resetTeams();
    const members = [...this.members];

    while (members.length) {
      for (let i = 0; i < numberOfTeams; i++) {
        const randomIndex = Math.floor(Math.random() * members.length);
        const [member] = members.splice(randomIndex, 1);

        this.teams[i] ? this.teams[i].push(member) : (this.teams[i] = [member]);
      }
    }

    this.resetMembers();
  }

  resetMembers() {
    this.members = [];
  }

  resetTeams() {
    this.teams = [];
  }

  get hasMembers() {
    return this.membersSize > 0;
  }

  get membersSize() {
    return this.members.length;
  }

  private validateMember(member: string) {
    if (this.isEmpty(member)) {
      throw new NewMemberBlank();
    }
  }

  private validateTeamGeneration(numberOfTeams: number) {
    if (this.isBellowOrEqualZero(numberOfTeams)) {
      throw new NumberOfTeamsBellowThanOrZero();
    }

    if (this.isBellowThanMemberSize(numberOfTeams)) {
      throw new NoEnoughMembers();
    }
  }

  private isBellowOrEqualZero(numberOfTeams: number) {
    return numberOfTeams <= 0;
  }

  private isBellowThanMemberSize(numberOfTeams: number) {
    return this.membersSize < numberOfTeams;
  }

  private isEmpty(member: string) {
    return member === '';
  }
}
