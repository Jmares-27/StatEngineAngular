import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportSuccessComponent } from './bug-report-success.component';

describe('BugReportSuccessComponent', () => {
  let component: BugReportSuccessComponent;
  let fixture: ComponentFixture<BugReportSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugReportSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugReportSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
