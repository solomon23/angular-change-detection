import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'regular',
  template: `<div
    [style]="{ border: '1px solid black', margin: '8px 0', padding: '8px' }"
    (mouseenter)="mouseOver = true"
    (mouseleave)="mouseOver = false"
  >
    <div>Hello RegularComponent! {{ runChangeDetection }}</div>
    <note
      >Change detection set to default. fires lots of change detections and
      async actions work</note
    >
    <regular-child></regular-child>
    <div>Mouse over {{ mouseOver }}</div>
    <div>
      <button (click)="setTimer()">async action</button> {{ actionState }}
    </div>
  </div> `,
})
export class RegularComponent implements OnInit {
  mouseOver = false;
  actionState = '';

  get runChangeDetection() {
    console.log('[regular] - change detection [Default]');
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
}
