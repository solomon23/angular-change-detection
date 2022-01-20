import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'onpush',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div
    [style]="{ border: '1px solid black', margin: '8px 0', padding: '8px' }"
  >
    Hello OnpushComponentComponent!
    {{ runChangeDetection }}
    <note
      >Change detection set to push. self actions work. async actions don't
      work. async action with pipe works. async action with force works</note
    >
    <onpush-child (clicked)="selfCount = selfCount + 1"></onpush-child>
    <div>Count {{ count }}</div>
    <div>
      <button (click)="selfCount = selfCount + 1">self count</button> Self count
      {{ selfCount }}
    </div>
    <div>
      <button (click)="setTimer()">async action</button> {{ actionState }}
    </div>
    <div>
      <button (click)="setTimerForce()">async action (force)</button>
    </div>
    <div>
      <button (click)="doAsyncActionPipe()">do async pipe action</button>
      <div>{{ puppies | async }}</div>
    </div>
    <div>
      <button (click)="doAsyncActionValue()">do async action</button>
      <div>{{ puppers }}</div>
    </div>
  </div>`,
})
export class OnpushComponent implements OnInit {
  @Input() count = 0;
  selfCount = 0;
  actionState = '';
  puppers = '';
  showAsync = false;
  puppies: Observable<string> | null = null;

  constructor(private cdref: ChangeDetectorRef, private service: AppService) {}

  get runChangeDetection() {
    console.log('[onpush] - change detection [Push]');
    return true;
  }

  ngOnInit() {}

  setTimer() {
    let count = 5;
    const doNextActions = () =>
      setTimeout(() => {
        if (count > 0) {
          count = count - 1;
          this.actionState = `${count}`;
          doNextActions();
        } else {
          this.actionState = 'BOOM!';
        }
      }, 500);

    doNextActions();
  }

  setTimerForce() {
    let count = 5;
    const doNextActions = () =>
      setTimeout(() => {
        if (count > 0) {
          count = count - 1;
          this.actionState = `${count}`;
          doNextActions();
        } else {
          this.actionState = 'BOOM!';
        }
        this.cdref.markForCheck();
      }, 500);

    doNextActions();
  }

  doAsyncActionValue() {
    this.service.getPuppies().subscribe({
      next: (val) => {
        this.puppers = val;
      },
    });
  }

  doAsyncActionPipe() {
    return this.service.getPuppies();
  }
}
