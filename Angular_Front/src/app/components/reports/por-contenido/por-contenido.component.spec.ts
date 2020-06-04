import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorContenidoComponent } from './por-contenido.component';

describe('PorContenidoComponent', () => {
  let component: PorContenidoComponent;
  let fixture: ComponentFixture<PorContenidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorContenidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
