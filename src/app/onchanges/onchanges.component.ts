import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NgChanges } from 'src/NgChanges';

export type OnChangesModel = {
  value: number;
};

@Component({
  selector: 'onchanges',
  template: `<div
    [style]="{ border: '1px solid black', margin: '8px 0', padding: '8px' }"
  >
    OnChanges! {{ runChangeDetection }}<br />
    <note
      >setters and onchanges called a single time. only called when changes are
      detected. change detection is not deep. will render the object without
      hitting setters because of change detection<br /><br />onChanges only
      called when there are changes. only the changed properties exist in
      changes. get access to previous value. get access to if this is the first
      time being set. some cheater ways to get type safety but mostly not. value
      is set before call is made</note
    >
    <div>setterval: {{ setterVal }}</div>
    <div>changesVal: {{ changesVal }}</div>
    <div>raw value: {{ modelChanges?.value }}</div>
  </div> `,
})
export class OnchangesComponent implements OnInit {
  setterVal?: string;
  changesVal?: string;

  @Input() set modelSetter(val: OnChangesModel) {
    console.log('[OnChanges] in setter');
    this.setterVal = `${val.value} puppies`;
  }

  @Input() modelChanges?: OnChangesModel;

  get runChangeDetection() {
    console.log('[onchanges] - change detection [Default]');
    return true;
  }

  ngOnInit() {}

  ngOnChanges(changes: NgChanges<OnchangesComponent>) {
    console.log('[OnChanges] in onchanges');
    if (changes.modelChanges) {
      this.changesVal = `${changes.modelChanges.currentValue?.value} puppies`;
    }
  }
}
