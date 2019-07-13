import { Component } from '@angular/core';
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
  animated:HTMLElement

  constructor(private router: Router) {
    // Create a new Observable that publishes only the NavigationStart event
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
    this.animated = <HTMLElement>document.querySelector(".animated");
  }

  ngOnInit() {
    this.navStart.subscribe(evt => {
      this.animated.style.display = "block"
      this.animated.style.opacity = "1";
    });
    this.navEnd.subscribe(evt => {
      this.animated.style.opacity = "0";
      setTimeout(() => {
        this.animated.style.display = "none";
      }, 500);
    });
  }
  
}
