import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, } from '@angular/common/http/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { IndicatorService } from 'src/app/services/indicator.service';
import { CrudIndicatorComponent } from './crud-indicator.component';
import { AddNewIndicatorService } from './service/add-new-indicator.service';


describe('CrudIndicatorComponent', () => {
    let component: CrudIndicatorComponent;
    let element: HTMLElement;
    let fixture: ComponentFixture<CrudIndicatorComponent>;
    let addNewIndicatorService: AddNewIndicatorService;
    let indicatorService: IndicatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, FormsModule, CommonModule,
                NzModalModule, NzFormModule, NzSwitchModule, NzSelectModule, HttpClientTestingModule, NzMessageModule],
            providers: [],
            declarations: [CrudIndicatorComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(CrudIndicatorComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        addNewIndicatorService = TestBed.inject(AddNewIndicatorService);
        indicatorService = TestBed.inject(IndicatorService);
        
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should test compare of objects', () => {
        expect(component.compare({}, {})).toEqual(true);
        expect(component.compare({id:1, name:"SDG Code"}, {id:1, name:"SDG Code"})).toEqual(true);
        expect(component.compare({id:2, name:"Source"}, {id:1, name:"Source"})).toEqual(false);
    });

});
