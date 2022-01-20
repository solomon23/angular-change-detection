import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OnChangesModel } from './onchanges/onchanges.component';

@Component({
  selector: 'app-root',
  template: `<div
    [style]="{ border: '1px solid black', margin: '8px 0', padding: '8px' }"
  >
    <div>Top app component {{ runChangeDetection }}</div>
    <div>
      <button (click)="selfCount = selfCount + 1">self count</button> Self count
      {{ selfCount }}
    </div>
    <div><button (click)="count = count + 1">Add count</button></div>
    <note
      >Clicking the self button fires change detection for everything. Add count
      updates the input value for onpush</note
    >
    <onpush [count]="count"></onpush>
    <regular></regular>
    <onchanges [modelSetter]="value" [modelChanges]="value"></onchanges>
    <onchanges-push [modelChanges]="value"></onchanges-push>
    <button (click)="value.value = value.value + 1">
      update on changes val
    </button>
    <button (click)="value = { value: value.value + 1 }">
      update on changes ref
    </button>
    <router-outlet></router-outlet>
  </div> `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent implements OnInit {
  count = 0;
  selfCount = 0;
  value: OnChangesModel = { value: 0 };

  get runChangeDetection() {
    console.log('[app] - change detection [Default]');
    return true;
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {}
}

/*
with default change detection:
- getters are called again when input is changed in parent
- setters and change detection aren't called when mutating an object
- "nothing button" causes getters on subcomponent to fire

with onPush:
- changes only update when input or subscriptions fire
- "nothing button" don't cause getters on subcomponent to fire
- events coming from subscriptions don't auto fire change detection
can use async pipe since it wires up `markForCheck` after the value changes
you can also just fire change detection `this.cdr.detectChanges();`

ngOnChanges
- have access to if this is the first time it's being set
- in ngOnChanges detection only the changes are set on "changes" ie changes.data?


https://netbasal.com/a-comprehensive-guide-to-angular-onpush-change-detection-strategy-5bac493074a4
*/
