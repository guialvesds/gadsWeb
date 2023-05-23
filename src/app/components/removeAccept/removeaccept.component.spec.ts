import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveacceptComponent } from './removeaccept.component';

describe('RemoveacceptComponent', () => {
  let component: RemoveacceptComponent;
  let fixture: ComponentFixture<RemoveacceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveacceptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveacceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
