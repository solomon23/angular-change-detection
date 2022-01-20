import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'regular-child',
  changeDetection: ChangeDetectionStrategy.Default,
  template: `<div
    [style]="{ border: '1px solid black', margin: '8px 0', padding: '8px' }"
  >
    Hello RegularChildComponent!
    {{ runChangeDetection }}
  </div>`,
})
export class RegularChildComponent implements OnInit {
  constructor() {}

  get runChangeDetection() {
    console.log('[regular] (child) - change detection [default]');
    return true;
  }

  ngOnInit() {}
}
