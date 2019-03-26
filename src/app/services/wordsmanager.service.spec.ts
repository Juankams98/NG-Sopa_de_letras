import { TestBed } from '@angular/core/testing';

import { WordsmanagerService } from './wordsmanager.service';

describe('WordsmanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WordsmanagerService = TestBed.get(WordsmanagerService);
    expect(service).toBeTruthy();
  });
});
