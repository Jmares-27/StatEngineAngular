import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFriendlistComponent } from './view-friendlist.component';

describe('ViewFriendlistComponent', () => {
  let component: ViewFriendlistComponent;
  let fixture: ComponentFixture<ViewFriendlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFriendlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFriendlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
