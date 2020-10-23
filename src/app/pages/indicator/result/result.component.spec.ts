import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { IndicatorService } from 'src/app/services/indicator.service';
import { HttpClientModule } from '@angular/common/http'
import { ResultComponent } from './result.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { MachineLearningService } from 'src/app/services/machinelearning.service';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let indicatorService: IndicatorService;
  let machineLearningService: MachineLearningService;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultComponent ],
      imports:[BrowserAnimationsModule, NzTableModule, NzTagModule, NzCollapseModule,
        NzModalModule, HttpClientTestingModule, HttpClientModule, NzMessageModule, NzInputModule],
        providers:[IndicatorService, MachineLearningService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    indicatorService = TestBed.inject(IndicatorService);
    machineLearningService = TestBed.inject(MachineLearningService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make a request to the statements endpoint', () => {
    spyOn(machineLearningService, 'getStatements').and.callThrough();
    component.ngOnInit();
  });

});
