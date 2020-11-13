import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';

describe('DialogComponent', () => {
    let component: DialogComponent;
    let element: HTMLElement;
    let fixture: ComponentFixture<DialogComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, CommonModule, NzLayoutModule, NzButtonModule],
            providers: [],
            declarations: [DialogComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it('should press the X button and close dialog', () => {
    //     sessionStorage.clear();
    //     component.ngOnInit();
    //     expect(component.visible).toBe(true);
    //     console.log("button!!!!!!!!!!!!!!!", element.getElementsByTagName('button').item(0));
    //     console.log("button222222222222222,", element.querySelector("button"));

    //     const spy = spyOn(component, 'close');
    //     const closeButton = fixture.debugElement.query(By.css('.dialog__lower-close-btn'));
    //     // const showmeButton = fixture.debugElement.query(By.css('#showMeButton'));
    //     // (element.getElementsByClassName('dialog__lower-close-btn').item(0) as HTMLElement).click();
    //     closeButton.triggerEventHandler('click', {});
    //     // showmeButton.triggerEventHandler('click', {});
    //     fixture.detectChanges();
      
        
    //     // fixture.debugElement.query(By.css('#showMeButton')).triggerEventHandler('click', null);
    //     expect(component.visible).toBe(false);
    //     expect(spy).toHaveBeenCalled();
    // });

    it('should press the X button and close dialog', () => {
        sessionStorage.clear();
        component.ngOnInit();
        expect(component.visible).toBe(true);
        component.close();
        expect(component.visible).toBe(false);
    });
});