import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDeclarationComponent } from './test-declaration.component';

describe('TestDeclarationComponent', () => {
  let component: TestDeclarationComponent;
  let fixture: ComponentFixture<TestDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
