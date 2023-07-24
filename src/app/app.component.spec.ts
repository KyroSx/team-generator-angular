import { AppComponent } from './app.component';
import { ComponentSut } from './testing/ComponentSut';
import {
  NewMemberBlank,
  NoEnoughMembers,
  NumberOfTeamsBellowThanOrZero,
} from './errors';

class Sut extends ComponentSut<AppComponent> {
  constructor() {
    super(AppComponent);
  }

  get newMemberInput() {
    return this.getElement<HTMLInputElement>('.input');
  }

  get numberOfTeamsInput() {
    return this.getElement<HTMLInputElement>('[placeholder="# of teams"]');
  }

  get numberOfTeamsButton() {
    return this.getElement<HTMLButtonElement>('.generate_teams_button');
  }

  get teamsList() {
    return this.getAllElements<HTMLLIElement>('.team_member');
  }

  get membersList() {
    return this.getElement<HTMLUListElement>('.members');
  }

  get memberErrorMessage() {
    return this.getElement<HTMLSpanElement>('.error_message');
  }

  get teamsErrorMessage() {
    return this.getElement<HTMLSpanElement>(
      '[aria-label="generate teams error message"]'
    );
  }

  get addMemberButton() {
    return this.getElement<HTMLButtonElement>('.add_member_button');
  }

  typeOnMemberInput(memberName: string) {
    this.dispatchInputEvent(this.newMemberInput, memberName);
  }

  typeNumberOfTeams(numberOfTeams: number) {
    this.dispatchInputEvent(this.numberOfTeamsInput, numberOfTeams.toString());
  }

  clickOnAddButton() {
    this.dispatchClickEvent(this.addMemberButton);
  }

  clickOnGenerateTeamsButton() {
    this.dispatchClickEvent(this.numberOfTeamsButton);
  }
}

describe('App Component', () => {
  let sut: Sut;

  beforeEach(async () => {
    sut = new Sut();

    await sut.setUpTest();
  });

  it('creates component properly', () => {
    expect(sut.component).toBeTruthy();
  });

  it('adds a member to the list', () => {
    sut.typeOnMemberInput('Member Name');
    sut.detectChanges();

    expect(sut.newMemberInput.value).toEqual('Member Name');
    expect(sut.newMemberInput).toHaveClass('input');

    sut.clickOnAddButton();
    sut.detectChanges();

    expect(sut.membersList.textContent).toContain('Member Name');
  });

  it('adds multiple members to the list', () => {
    const members = ['Member Name', 'Member Name #2', 'Member Name #3'];

    members.forEach(member => {
      sut.typeOnMemberInput(member);
      sut.detectChanges();

      sut.clickOnAddButton();
      sut.detectChanges();

      expect(sut.membersList.textContent).toContain(member);
    });
  });

  it('shows error message if member is blank', () => {
    sut.typeOnMemberInput('');
    sut.detectChanges();

    expect(sut.newMemberInput.value).toEqual('');

    sut.clickOnAddButton();
    sut.detectChanges();

    expect(sut.membersList).toBeNull();
    expect(sut.memberErrorMessage.textContent).toContain(
      NewMemberBlank.message
    );
    expect(sut.newMemberInput).toHaveClass('input_error');
    expect(sut.newMemberInput).toHaveClass('input');
  });

  const cases = [
    {
      id: '6 members for 3 teams',
      members: [
        'Member Name #1',
        'Member Name #2',
        'Member Name #3',
        'Member Name #4',
        'Member Name #5',
        'Member Name #6',
      ],
      numberOfTeams: 3,
      membersPerTeam: 2,
    },
    {
      id: '4 members for 2 teams',
      members: [
        'Member Name #1',
        'Member Name #2',
        'Member Name #3',
        'Member Name #4',
      ],
      numberOfTeams: 2,
      membersPerTeam: 2,
    },
  ];

  cases.forEach(test => {
    it(`generate random teams with inputted:  ${test.id}`, () => {
      test.members.forEach(member => {
        sut.typeOnMemberInput(member);
        sut.detectChanges();

        sut.clickOnAddButton();
        sut.detectChanges();
      });

      sut.typeNumberOfTeams(test.numberOfTeams);
      sut.detectChanges();

      sut.clickOnGenerateTeamsButton();
      sut.detectChanges();

      expect(sut.teamsList.length).toBe(test.numberOfTeams);

      sut.teamsList.forEach(element => {
        const members = element.textContent!.trim().split(', ');

        expect(members.length).toEqual(test.membersPerTeam);
      });
    });
  });

  it('shows and reset error message if have no enough members', () => {
    const numberOfTeams = 6;
    const members = ['Member Name', 'Member Name #2', 'Member Name #3'];

    members.forEach(member => {
      sut.typeOnMemberInput(member);
      sut.detectChanges();

      sut.clickOnAddButton();
      sut.detectChanges();
    });

    sut.typeNumberOfTeams(numberOfTeams);
    sut.detectChanges();

    sut.clickOnGenerateTeamsButton();
    sut.detectChanges();

    expect(sut.numberOfTeamsInput).toHaveClass('input_error');
    expect(sut.teamsErrorMessage.textContent).toContain(
      NoEnoughMembers.message
    );

    members.forEach(member => {
      sut.typeOnMemberInput(member);
      sut.detectChanges();

      sut.clickOnAddButton();
      sut.detectChanges();
    });

    sut.clickOnGenerateTeamsButton();
    sut.detectChanges();

    expect(sut.numberOfTeamsInput).not.toHaveClass('input_error');
    expect(sut.teamsErrorMessage).toBeFalsy();
  });

  it('shows error if number of teams is bellow than/or zero', async () => {
    const numberOfTeams = 0;
    const members = ['Member Name', 'Member Name #2', 'Member Name #3'];

    members.forEach(member => {
      sut.typeOnMemberInput(member);
      sut.detectChanges();

      sut.clickOnAddButton();
      sut.detectChanges();
    });

    sut.typeNumberOfTeams(numberOfTeams);
    sut.detectChanges();

    sut.clickOnGenerateTeamsButton();
    sut.detectChanges();

    expect(sut.numberOfTeamsInput).toHaveClass('input_error');
    expect(sut.teamsErrorMessage.textContent).toContain(
      NumberOfTeamsBellowThanOrZero.message
    );
  });
});
