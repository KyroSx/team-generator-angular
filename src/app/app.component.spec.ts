import { AppComponent } from './app.component';
import { ComponentSut } from './testing/ComponentSut';

class Sut extends ComponentSut<AppComponent> {
  constructor() {
    super(AppComponent);
  }

  get newMemberInput() {
    return this.getElement<HTMLInputElement>('.input');
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

  clickOnAddButton() {
    this.dispatchClickEvent(this.addMemberButton);
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

  it('shows error message if member is blank', async () => {
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
});
