import { Component, ChangeDetectorRef, ComponentFactoryResolver, ViewChild, ElementRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { PageService } from '../page/page.service';
import {  TestOtherState } from '../state/test.state';
import {  TestOver, SetIndex, PauseTestServer, PauseTest } from '../state/state.actions';
import { PageItem } from '../page/page-items';
import { PageSwitchDirective } from '../page-switch.directive';
import { PageComponent } from '../page/page-component.modal';
import { SideState, onTestNotFetched } from '../shared/global';
import { Test } from '../modals/test';
import  config  from '../../../data/config'
import { MediaQueryState, createMediaQuery, toggleFullScreen } from '../../shared/global';
import { GLobalState } from 'src/app/shared/global.state';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe, takeWhileAlive} from 'take-while-alive';
import { User } from 'src/app/modals/user';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
@AutoUnsubscribe()
export class ParentComponent {

  test: Test;
  otherState:TestOtherState = {
    isTestOver:false,
    id:null
  };
  isFullScreenEnabled: boolean = false;
  sections:string[];
  user:User;
  testPaused:boolean = false;

  //local config
  configData = config;

  /* constructor  */
  constructor(
    private cdr: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private ps: PageService,
    private store: Store<GLobalState>,
    private route:ActivatedRoute,
    private router:Router
  ) {
  }

  // media state and side toggler state
  sideState = new SideState();
  mediaQueryState: MediaQueryState = createMediaQuery(
    "(max-width: 900px)", (x: boolean) => this.sideState.toggler(!x, x), this.cdr
  );

  shortenClick() {
    this.sideState.toggler(null, this.mediaQueryState.isMediaMatched())
  }

  /* ng methods ****************************************************************/

  @ViewChild('fullScreenBtn', { static: false }) private fullScreenBtn: ElementRef<HTMLButtonElement>;

  ngAfterViewInit(): void {
    this.mediaQueryState.runMediaQuery()
  }

  ngOnDestroy(): void {
    /* handling media object disposal*/
    this.mediaQueryState.dispose()
    /** Clear the timer */
    this.clearTimer();

    /**This fixed elem remains being part of submit Modal or pause Modal
     * I need to remove it.
      */
     let elem = document.querySelector(".modal-backdrop");
     if(elem) elem.parentElement.removeChild(elem)    
  }

  ngOnInit() {
    /**
    * get pages component and load default page
    */
    this.pageItems = this.ps.getPages();
    this.loadComponent('');
    this.test = <Test> this.route.snapshot.data.test
    if(this.test) {
      this.start(); 
      //set index
      this.store.dispatch(SetIndex({ id:  Object.keys(this.test.questions)[0] }))
      this.sections = Object.keys(this.test.sections)
    }
    else {
      onTestNotFetched("There is problem fetching test!")
    }
    this.store.pipe(takeWhileAlive(this),select((state) => state.testOther))
      .subscribe((other) => this.otherState = other)
    this.store.pipe(take(1),select((state) => state.app.user))
      .subscribe((user) => this.user = user)
  }

  /* Loading the pages dyamically ****************************************** */

  pageItems: PageItem[];
  currentPage: string;
  defaultPage: string = "Mcqs";

  @ViewChild(PageSwitchDirective, { static: true }) pageSwitchDirective: PageSwitchDirective;

  loadComponent(name: string) {

    if (!name) name = this.defaultPage;
    this.currentPage = name;
    const pageItem = this.pageItems.find(elem => elem.data == name);

    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(pageItem.component);

    const viewContainerRef = this.pageSwitchDirective.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<PageComponent>componentRef.instance).closeEvent.pipe(take(1)).subscribe(() => {
      this.loadComponent(this.defaultPage)
    })

  }

  /**
   * introduced for small screen. So that on loading a different page the side
   * gets closed.
   * 
   * */
  checkAndLoadComponent(name: string) {
    this.loadComponent(name)
    if (this.mediaQueryState.isMediaMatched()) this.shortenClick()
  }

  //******************************************************** section */

  /**
   * section dropdown items click handler
   */
  sectionClick(section: string) {
    this.store.dispatch(SetIndex({ id: this.test.sections[section] }))
    return false
  }


  /**
   * Timer things over here ***********************************************
   */

  intervalId = 0;

  clearTimer() { clearInterval(this.intervalId); }
  start() { this.countDown(); this.testPaused = false;}
  stop() {
    this.clearTimer();
    this.testPaused = true;
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.test.time -= 1;
      if (this.test.time === 0) {
        this.store.dispatch(TestOver());
        this.pause();
      }
    }, 1000);
  }

  /**
   * modal things over here ****************************************************
   */
  @ViewChild('pauseModalNoBtn', { static: false }) private pauseModalNoBtn: ElementRef;
  @ViewChild('pauseSubmitBtn', { static: false }) private pauseSubmitBtn: ElementRef;

  pause() {
    /** First close pause modal */
    this.pauseModalNoBtn.nativeElement.click();
    /** Then open submit modal */
    this.pauseSubmitBtn.nativeElement.click();
    this.stop();
    this.store.dispatch(PauseTest({ time: this.test.time }))
    this.store.dispatch(PauseTestServer({ time: this.test.time }))
  }

  /**
   * toggle Full Screen
   */
  toggleFullScreen() {
    this.isFullScreenEnabled ? toggleFullScreen(false) : toggleFullScreen(true);
    this.isFullScreenEnabled = !this.isFullScreenEnabled;
  }

  /** Submit test */
  submitTest(fromModal = false) {
    this.stop();
    this.store.dispatch(PauseTest({ time: this.test.time }))
    this.store.dispatch(PauseTestServer({ time: this.test.time }))
    if(!fromModal)
      /** Then open submit modal */
      this.pauseSubmitBtn.nativeElement.click();
    else {
      this.test.time = 0
      this.store.dispatch(TestOver());
      this.store.dispatch(PauseTestServer({ time: this.test.time }))

      /** navigate to completed component */
      this.router.navigate(['/dashboard/completed/'+this.test._id])
    }
  }

}
