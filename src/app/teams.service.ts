import { Injectable } from '@angular/core';
import { NewMemberBlank } from './errors';

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

  generateTeams(number: number) {
    if (number <= 0) {
      throw new Error('Number of teams should be greater than 0.');
    }

    if (!this.hasMembers) {
      throw new Error('There are no members to generate teams.');
    }

    if (this.membersSize < number) {
      throw new Error('There are no enough members to generate teams.');
    }

    const members = [...this.members];

    while (members.length) {
      for (let i = 0; i < number; i++) {
        const randomIndex = Math.floor(Math.random() * members.length);
        const [member] = members.splice(randomIndex, 1);

        this.teams[i] ? this.teams[i].push(member) : (this.teams[i] = [member]);
      }
    }
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

  private isEmpty(member: string) {
    return member === '';
  }
}
