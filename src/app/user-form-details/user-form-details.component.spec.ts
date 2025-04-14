import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormDetailsComponent } from './user-form-details.component';

describe('UserFormDetailsComponent', () => {
  let component: UserFormDetailsComponent;
  let fixture: ComponentFixture<UserFormDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
