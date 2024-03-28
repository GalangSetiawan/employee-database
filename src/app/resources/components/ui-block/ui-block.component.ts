import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { UiBlockService } from './ui-block.service';


@Component({
  selector: 'app-ui-block',
  templateUrl: 'ui-block.component.html',
  styleUrls: ['ui-block.component.scss']
})
export class UiBlockComponent implements OnDestroy {

  public show: boolean = false;
  private subs: Subscription;

  constructor(private uiBlockService: UiBlockService) {
    this.subs = this.uiBlockService.getUiBlockEmitter().subscribe(
      (displayBlockUi: boolean) => {
        this.show = displayBlockUi;
      }
    );
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
    this.show = false;
  }
}
