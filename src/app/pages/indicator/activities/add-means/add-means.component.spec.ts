import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeansComponent } from './add-means.component';

describe('AddMeansComponent', () => {
  let component: AddMeansComponent;
  let fixture: ComponentFixture<AddMeansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMeansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMeansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
