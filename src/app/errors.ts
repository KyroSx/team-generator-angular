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

export class NumberOfTeamsBellowThanOrZero extends Error {
  static message = 'Number of teams should be greater than 0.';

  constructor() {
    super(NumberOfTeamsBellowThanOrZero.message);
  }
}
