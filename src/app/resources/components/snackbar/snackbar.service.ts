import { Injectable, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';


@Injectable()
export class SnackBarService implements OnDestroy {

  private snackbarSource = new Subject<string>();
  private snackbar$ = this.snackbarSource.asObservable();

  constructor() { }

  public ngOnDestroy() {
    this.snackbarSource.complete();
  }

  public getSnackbarObs(): Observable<string> {
    return this.snackbar$;
  }

  public show(message: any, translate: boolean = true): void {
    
      if (typeof message === 'string') {
        this.snackbarSource.next(message);
      } else {
        this.snackbarSource.next(message.desc!);
      }
    
  }
}
