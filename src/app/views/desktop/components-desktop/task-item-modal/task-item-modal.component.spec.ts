import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemModalComponent } from './task-item-modal.component';

describe('TaskItemModalComponent', () => {
  let component: TaskItemModalComponent;
  let fixture: ComponentFixture<TaskItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskItemModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
