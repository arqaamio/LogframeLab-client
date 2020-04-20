import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataprotectionComponent } from './dataprotection.component';

describe('DataprotectionComponent', () => {
  let component: DataprotectionComponent;
  let fixture: ComponentFixture<DataprotectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataprotectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataprotectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
