import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeReportComponent } from './see-report.component';

describe('SeeReportComponent', () => {
  let component: SeeReportComponent;
  let fixture: ComponentFixture<SeeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
