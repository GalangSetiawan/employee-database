import { Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';
import { SnackBarService } from './snackbar.service';


@Component({
  selector: 'app-snackbar',
  templateUrl: 'snackbar.component.html',
  styleUrls: ['snackbar.component.scss']
})
export class SnackBarComponent implements OnDestroy {

  @ViewChild('snackbar') public snackbar!: ElementRef;
  public message: string = '';

  private queueMessage: string[] = [];

  private hideTimer: any;

  private subs: Subscription;

  constructor(private renderer: Renderer2, private snackbarService: SnackBarService) {
    this.subs = this.snackbarService.getSnackbarObs().subscribe(
      (message: string) => {
        this.queueMessage.push(message);
        if (!this.isShown()) {
          this.show();
        } else {
          if (!this.isHiding()) {
            this.hide();
          }
        }
      }
    );
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private show() {
    this.message = this.queueMessage[0];
    this.renderer.addClass(this.snackbar.nativeElement, 'show');
    this.hideTimer = setTimeout(
      () => {
        this.hide();
      },
      5000
    );
  }

  private hide() {
    clearTimeout(this.hideTimer);
    this.renderer.addClass(this.snackbar.nativeElement, 'hide');

    setTimeout(
      () => {
        this.renderer.removeClass(this.snackbar.nativeElement, 'show');
        this.renderer.removeClass(this.snackbar.nativeElement, 'hide');

        this.queueMessage.splice(0, 1);

        if (this.queueMessage.length > 0) {
          this.show();
        }
      },
      500
    );
  }

  private isShown(): boolean {
    return this.snackbar.nativeElement.classList.contains('show');
  }

  private isHiding(): boolean {
    return this.snackbar.nativeElement.classList.contains('hide');
  }

  public dismiss() {
    this.hide();
  }
}
