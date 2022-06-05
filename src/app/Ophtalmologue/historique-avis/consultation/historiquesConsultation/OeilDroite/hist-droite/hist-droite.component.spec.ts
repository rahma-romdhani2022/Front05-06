import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistDroiteComponent } from './hist-droite.component';

describe('HistDroiteComponent', () => {
  let component: HistDroiteComponent;
  let fixture: ComponentFixture<HistDroiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistDroiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistDroiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
