import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopFormComponent } from './desktop-form.component';

describe('DesktopFormComponent', () => {
  let component: DesktopFormComponent;
  let fixture: ComponentFixture<DesktopFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesktopFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
