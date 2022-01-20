import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'onpush-child',
  changeDetection: ChangeDetectionStrategy.Default,
  template: `<div
    [style]="{ border: '1px solid black', margin: '8px 0', padding: '8px' }"
  >
    Hello OnpushChildComponent! {{ runChangeDetection }}
    <note
      >Change detection set to default. output fires into the parent. async
      actions don't work unless forcing change detection.</note
    >
    <button (click)="clicked.emit()">output</button>
    <button (click)="asyncAction()">async action</button>
    <button (click)="asyncActionForce()">async action (force)</button>
    {{ puppies }}
  </div>`,
})
export class OnpushChildComponent implements OnInit {
  @Output() clicked = new EventEmitter<void>(undefined);
  puppies = '';

  constructor(private cdr: ChangeDetectorRef, private service: AppService) {}

  get runChangeDetection() {
    console.log('[onpush] (child) - change detection [default]');
    return true;
  }

  ngOnInit() {}

  asyncAction() {
    this.service.getPuppies().subscribe({
      next: (val) => {
        this.puppies = val;
      },
    });
  }

  asyncActionForce() {
    this.service.getPuppies().subscribe({
      next: (val) => {
        this.puppies = val;
        this.cdr.detectChanges();
      },
    });
  }
}
