import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchAddQuestionsComponent } from './batch-add-questions.component';

describe('BatchAddQuestionsComponent', () => {
  let component: BatchAddQuestionsComponent;
  let fixture: ComponentFixture<BatchAddQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchAddQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchAddQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
