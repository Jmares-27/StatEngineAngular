import { TestBed } from '@angular/core/testing';

import { PasswordresetService } from '../backend-services/passwordreset.service';

describe('PasswordresetService', () => {
  let service: PasswordresetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordresetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
