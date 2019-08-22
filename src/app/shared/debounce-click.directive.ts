import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output
} from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

/**
 * https://stackoverflow.com/questions/51390476/how-to-prevent-double-click-in-angular/51390698
 * 
 * Usage:
 * <button appDebounceClick (debounceClick)="log()" [debounceTime]="700">Debounced Click</button>
 */
@Directive({
  selector: "[appDebounceClick]"
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Input() debounceTime = 500;

  @Output()
  debounceClick = new EventEmitter();

  private clicks = new Subject();
  private subscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.subscription = this.clicks
      .pipe(debounceTime(this.debounceTime))
      .subscribe(e => this.debounceClick.emit(e));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener("click", ["$event"])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}
