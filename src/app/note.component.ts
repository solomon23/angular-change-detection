import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'note',
  template: `<div
    [style]="{ fontSize: '12px', margin: '4px 0', color: '#0f0f0f' }"
  >
    <ng-content></ng-content>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent {}
