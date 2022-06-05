import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiensResetFormComponent } from './liens-reset-form.component';

describe('LiensResetFormComponent', () => {
  let component: LiensResetFormComponent;
  let fixture: ComponentFixture<LiensResetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiensResetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiensResetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
