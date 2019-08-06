import { Injectable } from '@angular/core';
import { TestWithFeatures } from 'src/app/amplitude-test/modals/test';


@Injectable()
export class ParentService {
  tests:TestWithFeatures[];
  constructor() { }
}
