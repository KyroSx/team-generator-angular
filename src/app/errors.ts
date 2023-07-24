export class NewMemberBlank extends Error {
  static message = 'Name cant be blank.';

  constructor() {
    super(NewMemberBlank.message);
  }
}

export class NoEnoughMembers extends Error {
  static message = 'There are no enough members to generate teams.';

  constructor() {
    super(NoEnoughMembers.message);
  }
}
