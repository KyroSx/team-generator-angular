import { AppComponent } from './app.component';
import { ComponentSut } from './testing/ComponentSut';

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
    expect(sut.memberErrorMessage.textContent).toContain('Name cant be blank');
    expect(sut.newMemberInput).toHaveClass('input_error');
    expect(sut.newMemberInput).toHaveClass('input');
  });

  it('generate random teams with inputted members', () => {
    const members = [
      'Member Name',
      'Member Name #2',
      'Member Name #3',
      'Member Name #4',
    ];

    members.forEach(member => {
      sut.typeOnMemberInput(member);
      sut.detectChanges();

      sut.clickOnAddButton();
      sut.detectChanges();
    });

    sut.typeNumberOfTeams(2);
    sut.detectChanges();

    sut.clickOnGenerateTeamsButton();
    sut.detectChanges();

    expect(sut.teamsList.length).toBe(2);
  });
});
