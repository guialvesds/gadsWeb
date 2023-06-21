import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsFormsComponent } from './settings-forms.component';

describe('SettingsFormsComponent', () => {
  let component: SettingsFormsComponent;
  let fixture: ComponentFixture<SettingsFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
