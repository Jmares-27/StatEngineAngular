import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteamLoadingPageComponent } from './steam-loading-page.component';

describe('SteamLoadingPageComponent', () => {
  let component: SteamLoadingPageComponent;
  let fixture: ComponentFixture<SteamLoadingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SteamLoadingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SteamLoadingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
