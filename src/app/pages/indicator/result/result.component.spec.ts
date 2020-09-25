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

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let indicatorService: IndicatorService;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultComponent ],
      imports:[BrowserAnimationsModule, NzTableModule, NzTagModule, NzCollapseModule,
        NzModalModule, HttpClientTestingModule, HttpClientModule, NzMessageModule, NzInputModule],
        providers:[IndicatorService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    indicatorService = TestBed.inject(IndicatorService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getResult function call', () => {
    spyOn(indicatorService, 'getResult').and.callThrough();
    component.ngOnInit();
  });

  it('result data binding', () => {
    indicatorService.getResult().subscribe((res) =>{
      indicatorService.collapseData = [
        {
          active: true,
          name: 'Impact',
          status:"active",
          value:70,
          data:  res.impact.map((indicator,i)=>{
            indicator.statusColor = 'success';
            indicator.scoreType = 'active';
            return {indicator: indicator, sort_id: i + 1}
          })
        },
        {
          active: true,
          name: "Outcome",
          status: "exception",
          value: 30,
          data: res.outcome.map((indicator,i)=>{
            indicator.statusColor = 'exception';
            indicator.scoreType = 'active';
            return {indicator: indicator, sort_id: i + 1}
          })
        },
        {
          active: true,
          name: 'Output',
          status:"success",
          value:100,
          data: res.output.map((indicator,i)=>{
            indicator.statusColor = 'success';
            indicator.scoreType = 'active';
            return {indicator: indicator, sort_id: i + 1}
          })
        }
      ];
    });    
  });

});
