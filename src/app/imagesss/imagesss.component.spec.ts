import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesssComponent } from './imagesss.component';

describe('ImagesssComponent', () => {
  let component: ImagesssComponent;
  let fixture: ComponentFixture<ImagesssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
