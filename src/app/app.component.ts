import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from './auth.service';


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
  navEnd:Observable<NavigationEnd>;


  @ViewChild('routerProgress', { static: false }) private routerProgress: ElementRef;
  @ViewChild('networkStatus', { static: false }) private networkStatus: ElementRef;

  constructor(private router: Router, private auth:AuthService) {

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

    window.addEventListener('online',  this.networkStatusToggle.bind(this));
    window.addEventListener('offline', this.networkStatusToggle.bind(this))  
  }

  networkStatusToggle(ev, closeMe:boolean =false) {
    let elem = <HTMLElement> this.networkStatus.nativeElement;
    if(navigator.onLine || closeMe) {
      elem.style.opacity = "0";
      setTimeout(() => elem.style.display = "none", 250);
    }else {
      elem.style.display = "flex";
      elem.style.opacity = "1";
    }
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
      this.auth.lastUrlLoaded = evt.url
    });

    /**
     * Remove the loading animation with transition
     */
    let animated = <HTMLElement>document.querySelector(".animated");
    animated.style.opacity = "0";
      setTimeout(() => {
        animated.parentElement.removeChild(animated)
      }, 500);

    /** run intially */
    this.networkStatusToggle(null)
  }
  
}
