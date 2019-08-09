import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionEditorComponent } from './instruction-editor.component';

describe('InstructionEditorComponent', () => {
  let component: InstructionEditorComponent;
  let fixture: ComponentFixture<InstructionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
