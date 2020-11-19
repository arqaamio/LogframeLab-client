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

describe('SourcesComponent', () => {
    let component: SourcesComponent;
    let element: HTMLElement;
    let fixture: ComponentFixture<SourcesComponent>;

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
        fixture.detectChanges();
    });

    it('should create', () => { 
        expect(component).toBeTruthy();
    });

});