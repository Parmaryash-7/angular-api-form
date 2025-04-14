import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterForFormComponent } from './master-for-form.component';

describe('MasterForFormComponent', () => {
  let component: MasterForFormComponent;
  let fixture: ComponentFixture<MasterForFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterForFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterForFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
