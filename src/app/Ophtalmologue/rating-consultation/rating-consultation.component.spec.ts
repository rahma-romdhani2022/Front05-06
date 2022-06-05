import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingConsultationComponent } from './rating-consultation.component';

describe('RatingConsultationComponent', () => {
  let component: RatingConsultationComponent;
  let fixture: ComponentFixture<RatingConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
