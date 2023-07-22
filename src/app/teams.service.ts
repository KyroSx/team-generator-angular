import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  members: string[] = [];

  addMember(member: string) {
    this.members.push(member);

    console.log(this.members);
  }
}
