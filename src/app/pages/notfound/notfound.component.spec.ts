import { TestBed, ComponentFixture, inject, fakeAsync, tick } from '@angular/core/testing';
import { NotFoundComponent } from './notfound.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from 'src/app/app.module';

describe('NotFoundComponent', () => {
    let component: NotFoundComponent;
    let element: HTMLElement;
    let fixture: ComponentFixture<NotFoundComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserModule, HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
            providers: [],
            declarations: [NotFoundComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NotFoundComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {                
        let button: HTMLElement = element.getElementsByTagName('button').item(0) as HTMLElement;
        expect(button).toBeTruthy();
        expect(button.firstChild.nodeValue).toBe('Home');
        expect(component).toBeTruthy();
    });
});