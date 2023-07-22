import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { AppComponent } from './app.component';

class Sut {
  component!: AppComponent;
  fixture!: ComponentFixture<AppComponent>;

  async setUpTest() {
    await this.configureTestModule();

    this.fixture = TestBed.createComponent(AppComponent);
    this.component = this.fixture.componentInstance;
  }

  async configureTestModule() {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    }).compileComponents();
  }

  detectChanges() {
    this.fixture.detectChanges();
  }

  get newMemberInput() {
    return this.getElement<HTMLInputElement>('.input');
  }

  get membersList() {
    return this.getElement<HTMLUListElement>('.members');
  }

  typeOnMemberInput(memberName: string) {
    this.newMemberInput.value = memberName;
    this.newMemberInput.dispatchEvent(new Event('input'));
  }

  clickOnAddButton() {
    return this.getElement<HTMLButtonElement>('.add_member_button').click();
  }

  private getElement<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
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

    sut.clickOnAddButton();
    sut.detectChanges();

    expect(sut.membersList.textContent).toContain('Member Name');
  });
});
