import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McqStatesComponent } from './mcq-states.component';

describe('McqStatesComponent', () => {
  let component: McqStatesComponent;
  let fixture: ComponentFixture<McqStatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McqStatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McqStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
