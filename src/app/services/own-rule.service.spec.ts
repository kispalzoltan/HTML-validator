import { TestBed } from '@angular/core/testing';

import { OwnRuleService } from './own-rule.service';

describe('OwnRuleService', () => {
  let service: OwnRuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnRuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
