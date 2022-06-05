import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistGaucheComponent } from './hist-gauche.component';

describe('HistGaucheComponent', () => {
  let component: HistGaucheComponent;
  let fixture: ComponentFixture<HistGaucheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistGaucheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistGaucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
