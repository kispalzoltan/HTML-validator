import { TestBed } from '@angular/core/testing';
import { describe, beforeEach, it } from 'node:test';
import { ChatgptService } from './chatgpt.service';



describe('ChatgptService', () => {
  let service: ChatgptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatgptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
