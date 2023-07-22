import { Injectable } from '@angular/core';
import { NewMemberBlank } from './errors';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  members: string[] = [];

  addMember(member: string) {
    this.validateMember(member);
    this.members.push(member);
  }

  get hasMembers() {
    return this.members.length > 0;
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
