import { Injectable } from '@angular/core';
import * as cryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncrDecrService {

  constructor() {
  }
  
  set(secret:string, value:string){
    return cryptoJS.AES.encrypt(value, secret).toString();
  }
  //The get method is use for decrypt the value.
  get(secret:string, value:string){
    return cryptoJS.AES.decrypt(value, secret).toString(cryptoJS.enc.Utf8)
  }
}
