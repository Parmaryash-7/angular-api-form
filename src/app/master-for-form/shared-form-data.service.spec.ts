import { TestBed } from '@angular/core/testing';

import { SharedFormDataService } from './shared-form-data.service';

describe('SharedFormDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedFormDataService = TestBed.get(SharedFormDataService);
    expect(service).toBeTruthy();
  });
});
