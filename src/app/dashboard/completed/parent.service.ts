import { Injectable } from '@angular/core';
import { TestResponse } from 'src/app/amplitude-test/modals/test';


@Injectable()
export class ParentService {
  tests:TestResponse[];
  constructor() { }
}
