import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualisationresultComponent } from './visualisationresult.component';

describe('VisualisationresultComponent', () => {
  let component: VisualisationresultComponent;
  let fixture: ComponentFixture<VisualisationresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualisationresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualisationresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
