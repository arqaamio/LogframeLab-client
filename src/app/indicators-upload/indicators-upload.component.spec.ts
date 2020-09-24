import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { IndicatorsUploadComponent } from './indicators-upload.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndicatorService } from 'src/app/services/indicator.service';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { NzUploadModule, NzPopoverModule, NzButtonModule } from 'ng-zorro-antd';


describe('IndicatorsUploadComponent', () => {
    let component: IndicatorsUploadComponent;
    let element: HTMLElement;
    let fixture: ComponentFixture<IndicatorsUploadComponent>;
    let indicatorService: IndicatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, CommonModule, HttpClientTestingModule, NzMessageModule, NzUploadModule, NzPopoverModule, NzButtonModule],
            providers: [],
            declarations: [IndicatorsUploadComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IndicatorsUploadComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        indicatorService = TestBed.inject(IndicatorService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open and close popover', inject([HttpTestingController], (httpMock: HttpTestingController) => {
        expect(fixture.debugElement.query(By.css('.stepIcon')).childNodes[1].nativeNode.firstChild.nodeValue.trim()).toEqual('?');
        expect(component.visible).toEqual(false);
        (element.querySelector('.stepIcon') as HTMLElement).click();
        expect(component.visible).toEqual(true);
        // expect(fixture.debugElement.query(By.css('.stepIcon')).classes).toEqual({'stepIcon': true, 'ant-btn': true, 'ant-popover-open': true});        
        component.clickClose();
        expect(component.visible).toBe(false);
        expect(fixture.debugElement.query(By.css('.stepIcon')).classes).toEqual({'stepIcon': true, 'ant-btn': true});
    }));
});
