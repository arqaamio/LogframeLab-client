import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssumptionsComponent } from './add-assumptions.component';

describe('AddAssumptionsComponent', () => {
  let component: AddAssumptionsComponent;
  let fixture: ComponentFixture<AddAssumptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAssumptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssumptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
