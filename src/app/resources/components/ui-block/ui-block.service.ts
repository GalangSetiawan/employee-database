import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UiBlockService implements OnDestroy {

  private uiBlockEmitter: Subject<boolean>;

  private requestCount: number;

  constructor() {
    this.uiBlockEmitter = new Subject<boolean>();
    this.requestCount = 0;
  }

  public ngOnDestroy() {
    this.uiBlockEmitter.complete();
  }

  public getUiBlockEmitter(): Observable<boolean> {
    return this.uiBlockEmitter.asObservable();
  }

  public showUiBlock(): void {
    this.uiBlockEmitter.next(true);
    this.requestCount++;
  }

  public hideUiBlock() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.uiBlockEmitter.next(false);
      this.requestCount = 0;
    }
  }

  public clearUiBlock() {
    this.uiBlockEmitter.next(false);
    this.requestCount = 0;
  }

  public isUiBlockHidden() {
    return this.requestCount <= 0;
  }
}
