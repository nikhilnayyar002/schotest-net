import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeStyle'
})
export class SafeStylePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any, type:string): any {
    
    if(type=="dom")
      return this.sanitizer.bypassSecurityTrustHtml(value)
    
    return null
  }

}
