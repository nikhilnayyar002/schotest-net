import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import config from 'src/data/config';


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

  constructor(private router: Router, private auth:AuthService, private route:ActivatedRoute) {

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
    this.navStart.subscribe(evt => this.routerProgress.nativeElement.style.opacity = "1");

    this.navEnd.subscribe(evt => {
      this.routerProgress.nativeElement.style.opacity = "0"

      /**
       * check for page-not-found component. to do that i have two ways:
       * 1. Check component property of activatedRoute.
       * 2. Check data property of activatedRoute. (let's do this)
       */
   
        // .map((route) => {
        //   while (route.firstChild) route = route.firstChild;
        //   return route;
        // })
        // .filter((route) => route.outlet === 'primary')
        // .mergeMap((route) => route.data)
        /**
         * "page not found" component route is just first child of AppComponent route
         */

        let firstChild = this.router.routerState.root.firstChild
        if(firstChild && firstChild.snapshot.data && firstChild.snapshot.data["iam"] == "pageNotFound")
          null
        /** Check and correct for an infinite redirect to login component*/
        else if (evt.url != config.clientRoutes.login() && evt.url !=config.clientRoutes.root())
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
