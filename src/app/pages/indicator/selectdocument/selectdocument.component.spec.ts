import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectdocumentComponent } from './selectdocument.component';

describe('SelectdocumentComponent', () => {
  let component: SelectdocumentComponent;
  let fixture: ComponentFixture<SelectdocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectdocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
