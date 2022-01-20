import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NgChanges } from 'src/NgChanges';
import { OnChangesModel } from './onchanges.component';

@Component({
  selector: 'onchanges-push',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div
    [style]="{ border: '1px solid black', margin: '8px 0', padding: '8px' }"
  >
    OnChangesPush! {{ runChangeDetection }}<br />
    <note
      >change detection set to push. won't re-render raw object since no changes
      detected</note
    >
    <div>changesVal: {{ changesVal }}</div>
    <div>raw value: {{ modelChanges?.value }}</div>
  </div> `,
})
export class OnchangesPushComponent implements OnInit {
  setterVal?: string;
  changesVal?: string;

  @Input() modelChanges?: OnChangesModel;

  get runChangeDetection() {
    console.log('[onchanges-push] - change detection [Push]');
    return true;
  }

  ngOnInit() {}

  ngOnChanges(changes: NgChanges<OnchangesPushComponent>) {
    console.log('[onchanges-push] - onChanges');
    if (changes.modelChanges) {
      this.changesVal = `${changes.modelChanges.currentValue?.value} puppies`;
    }
  }
}
