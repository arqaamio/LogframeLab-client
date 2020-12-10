import { TestBed, ComponentFixture, inject, fakeAsync, tick } from '@angular/core/testing';
import { SourcesComponent } from './sources.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from '../../app.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SourceService } from 'src/app/services/source.service';
import { of } from 'rxjs/internal/observable/of';

describe('SourcesComponent', () => {
    let component: SourcesComponent;
    let element: HTMLElement;
    let fixture: ComponentFixture<SourcesComponent>;
    let sourceService: SourceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserModule, HttpClientTestingModule, RouterTestingModule.withRoutes(routes),
                CommonModule,
                FormsModule,            
                NzButtonModule,
                NzInputModule,
                NzModalModule,
                NzTableModule
            ],
            providers: [],
            declarations: [SourcesComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SourcesComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        sourceService = TestBed.inject(SourceService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(sourceService).toBeTruthy();
    });

    it('should refresh table', () => {
        const sources = sampleSources();
        const spySources = spyOn(sourceService, 'getSources').and.returnValue(of(sources));
        component.refreshTable();
        expect(spySources).toHaveBeenCalled();
        expect(component.listOfData).toEqual(sources);
    });

    it('should edit source', () => {
        const sourceId: number = 2;
        const sources = sampleSources();
        component.listOfData = sources;
        component.editSource(sourceId);
        expect(component.sourceId).toBe(sourceId);
        expect(component.sourceName).toEqual('World Bank');
        expect(component.isModalVisible).toBe(true);
    });

    it('should create a new source', () => {
        const newSourceName: string = 'New Source';
        const sources = sampleSources();
        component.listOfData = sources;
        component.sourceName = newSourceName;
        const spySources = spyOn(sourceService, 'getSources').and.returnValue(of(sources));
        const spyCreate = spyOn(sourceService, 'createSource').and.returnValue(of([]));
        component.saveSource();
        expect(spySources).toHaveBeenCalled();
        expect(spyCreate).toHaveBeenCalledWith(newSourceName);
        expect(component.sourceId).toBeNull();
        expect(component.sourceName).toBeNull();
        expect(component.isModalVisible).toBe(false);
    });

    it('should update an existing source', () => {
        const sourceId: number = 2;
        const updatedSourceName: string = 'New Source';
        const sources = sampleSources();
        const spyUpdate = spyOn(sourceService, 'updateSource').and.returnValue(of([]));
        component.sourceName = updatedSourceName;
        component.sourceId = sourceId;
        component.listOfData = sources;
        component.saveSource();
        expect(spyUpdate).toHaveBeenCalledWith(sourceId, updatedSourceName);
        expect(component.sourceId).toBeNull();
        expect(component.sourceName).toBeNull();
        expect(component.isModalVisible).toBe(false);
    });

    it('should close modal', () => {
        component.isModalVisible = true;
        component.sourceId = 2;
        component.sourceName = 'Source name';
        component.handleCancelModal();
        expect(component.sourceId).toBeNull();
        expect(component.sourceName).toBeNull();
        expect(component.isModalVisible).toBe(false);
    });

    function sampleSources(): any[] {
        return [{id:1, name: 'UN'}, {id:2, name:'World Bank'}];
    }
});