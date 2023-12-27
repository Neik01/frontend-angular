import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStateModalComponent } from './login-state-modal.component';

describe('LoginStateModalComponent', () => {
  let component: LoginStateModalComponent;
  let fixture: ComponentFixture<LoginStateModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginStateModalComponent]
    });
    fixture = TestBed.createComponent(LoginStateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
