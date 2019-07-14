import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /**
   * Animation HTML - CSS
   * 
   */
  navStart:Observable<NavigationStart>;
  navEnd:Observable<any>;
  @ViewChild('routerProgress', { static: false }) private routerProgress: ElementRef;

  constructor(private router: Router) {

    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
    
    this.navEnd = router.events.pipe(
      filter(evt => 
        evt instanceof NavigationEnd ||
        evt instanceof NavigationError ||
        evt instanceof NavigationCancel
      )
    ) as Observable<any>;
    
  }

  ngAfterViewInit(): void {

    /**
     * Subscribing to router events
     */
    this.navStart.subscribe(evt => {
      this.routerProgress.nativeElement.style.opacity = "1"
    });
    this.navEnd.subscribe(evt => {
      this.routerProgress.nativeElement.style.opacity = "0"
    });

    /**
     * Remove the loading animation with transition
     */
    let animated = <HTMLElement>document.querySelector(".animated");
    animated.style.opacity = "0";
      setTimeout(() => {
        animated.parentElement.removeChild(animated)
      }, 500);
  }
  
}
