import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { IndicatorService } from 'src/app/services/indicator.service';
import { HttpClientModule, HttpEventType } from '@angular/common/http'
import { GRADIENT_GREEN, GRADIENT_LIGHT_GREEN, GRADIENT_ORANGE, GRADIENT_RED, GRADIENT_YELLOW, ResultComponent } from './result.component';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { MachineLearningService } from 'src/app/services/machinelearning.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let indicatorService: IndicatorService;
  let machineLearningService: MachineLearningService;
  let messageService: NzMessageService;
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultComponent ],
      imports:[BrowserAnimationsModule, NzTableModule, NzTagModule, NzCollapseModule,
        NzModalModule, HttpClientTestingModule, HttpClientModule, NzMessageModule, NzInputModule],
        providers:[IndicatorService, MachineLearningService, NzMessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    indicatorService = TestBed.inject(IndicatorService);
    machineLearningService = TestBed.inject(MachineLearningService);
    messageService = TestBed.inject(NzMessageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make a request to the statements endpoint', () => {
    let statements: any = {impact: [{statement: 'Statement 1', score:80, status:'good'}]};
    let expectedListData: any = exampleListOfData();
    const spyIndicatorSubject = spyOn(indicatorService, 'getIndicatorSubject').and.callThrough().and.returnValue(new BehaviorSubject({files: [new Blob()]}));
    const spyMachineLearning = spyOn(machineLearningService, 'getStatements').and.callThrough().and.returnValue(of({type: HttpEventType.Response, body: statements}));
    
    component.ngOnInit();

    expect(spyIndicatorSubject).toHaveBeenCalled();
    expect(spyMachineLearning).toHaveBeenCalled();

    expect(component.listOfData).toEqual(expectedListData);
  });

  it('should set gradient color', () => {
    let statement: any = {score:5};
    component.setScoreGradient(statement);
    expect(statement.gradient).toBe(GRADIENT_RED);

    statement = {score:20};
    component.setScoreGradient(statement);
    expect(statement.gradient).toBe(GRADIENT_ORANGE);

    statement = {score:45};
    component.setScoreGradient(statement);
    expect(statement.gradient).toBe(GRADIENT_YELLOW);
    
    statement = {score:70};
    component.setScoreGradient(statement);
    expect(statement.gradient).toBe(GRADIENT_LIGHT_GREEN);
    
    statement = {score:80};
    component.setScoreGradient(statement);
    expect(statement.gradient).toBe(GRADIENT_GREEN);
  });

  it('should set status color', () => {
    let statement: any = {status:'good'};
    component.setStatusColor(statement);
    expect(statement.statusColor).toBe('green');

    statement = {status:'bad'};
    component.setStatusColor(statement);
    expect(statement.statusColor).toBe('red');

    statement = {status:'fakestatus'};
    component.setStatusColor(statement);
    expect(statement.statusColor).toBe('yellow');
  });

  it('should set level color', () => {
    let statement: any = {level:'IMPACT'};
    component.setLevelColor(statement);
    expect(statement.colorLevel).toBe('#453457');

    statement = {level:'OUTCOME'};
    component.setLevelColor(statement);
    expect(statement.colorLevel).toBe('#6B3C53');

    statement = {level:'OUTPUT'};
    component.setLevelColor(statement);
    expect(statement.colorLevel).toBe('#637743');
  });

  it('should add row', () => {
    // clone array
    let expectedListOfData: any = exampleListOfData();
    expectedListOfData.push({id:2});
    component.maxId = 1;
    component.listOfData = exampleListOfData();
    component.addRow();
    expect(component.listOfData).toEqual(expectedListOfData);
    expect(component.maxId).toEqual(2);
  });

  it('should delete row', () => {
    let expectedListOfData: any = [];
    component.listOfData = exampleListOfData();
    component.deleteRow(0);
    expect(component.listOfData).toEqual(expectedListOfData);
  });

  it('should validate statement', () => {
    const spyValidate = spyOn(machineLearningService, 'validateStatement').and.returnValue(of({score:70, status: 'good'}));
    const expected = exampleListOfData();
    expected.push({statement: 'Statement 2', level: 'IMPACT', score:70, status: 'GOOD', colorLevel: '#453457', statusColor: 'green', gradient: GRADIENT_LIGHT_GREEN, id:1});
    const data = exampleListOfData();
    data.push({statement: 'Statement 2', level: 'IMPACT', id:1, colorLevel: '#453457'});
    component.listOfData = data;
    component.validateStatement(1);
    expect(spyValidate).toHaveBeenCalledWith('Statement 2', 'IMPACT');
    expect(component.listOfData).toEqual(expected);
  });

  it('should not validate statement', () => {
    const spyError = spyOn(messageService, 'error');
    const spyValidate = spyOn(machineLearningService, 'validateStatement').and.returnValue(of({score:70, status: 'good'}));

    component.listOfData = [{statement: 'Statement 1'}];
    component.validateStatement(0);
    expect(spyError).toHaveBeenCalled();
    expect(spyValidate).not.toHaveBeenCalled();
  });

  function exampleListOfData(): any[] {
    return [{statement: 'Statement 1', score:80, status: 'GOOD', colorLevel: '#453457', statusColor: 'green', gradient: GRADIENT_GREEN, level: 'IMPACT', id:0}];
  }

});
