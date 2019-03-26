import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApalabradoComponent } from './apalabrado.component';

describe('ApalabradoComponent', () => {
  let component: ApalabradoComponent;
  let fixture: ComponentFixture<ApalabradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApalabradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApalabradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
