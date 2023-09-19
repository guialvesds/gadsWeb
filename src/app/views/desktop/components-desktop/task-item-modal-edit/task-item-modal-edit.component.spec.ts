import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemModalEditComponent } from './task-item-modal-edit.component';

describe('TaskItemModalEditComponent', () => {
  let component: TaskItemModalEditComponent;
  let fixture: ComponentFixture<TaskItemModalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskItemModalEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskItemModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
