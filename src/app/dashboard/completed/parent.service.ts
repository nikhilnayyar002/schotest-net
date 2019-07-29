import { Injectable } from '@angular/core';
import { TestResponse } from 'src/app/amplitude-test/modals/test';


@Injectable()
export class ParentService {
  currentSelectedTest:TestResponse;
  constructor() { }
}
