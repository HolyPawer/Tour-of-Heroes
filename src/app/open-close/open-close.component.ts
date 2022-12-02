import { animate, state, style, transition, trigger, query, stagger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-open-close',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '200px',
          width: '400px',
          opacity: 1,
          backgroundColor: 'green',
        }),
      ),
      state(
        'closed',
        style({
          height: '150px',
          width: '500px',
          opacity: 0.7,
          backgroundColor: 'yellow',
        }),
      ),
      transition('open => closed', [animate(800)]),
      transition('closed => open', [animate(600)]),
      transition('* => closed', [animate(1000)]),
      transition('* => open', [animate(500)]),
      transition('open <=> closed', [animate(500)]),
      transition('* => open', [animate(1000, style({ opacity: '*' }))]),
      transition('* => *', [animate(1000)]),
    ]),

    trigger('flyInOut', [
      state(
        'in',
        style({
          transform: 'translateX(0)',
          height: '200px',
          width: '400px',
          backgroundColor: 'green',
        }),
      ),
      transition('void => *', [
        style({
          transform: 'translateX(-100%)',
          height: '150px',
          width: '500px',
          backgroundColor: 'yellow',
        }),
        animate(600),
      ]),
      transition('* => void', [
        animate(
          800,
          style({
            transform: 'translateX(100%)',
            height: '250px',
            width: '500px',
            backgroundColor: 'red',
            fontSize: '40px',
            textAlign: 'center',
            color: 'white',
          }),
        ),
      ]),
    ]),

    trigger('myInsertRemoveTrigger', [
      transition(':enter', [style({ opacity: 0 }), animate('100ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),

    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(
          ':enter',
          [
            style({ opacity: 0, width: '0px' }),
            stagger(50, [animate('300ms ease-out', style({ opacity: 1, width: '*' }))]),
          ],
          { optional: true },
        ),
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [animate('300ms ease-out', style({ opacity: 0, width: '0px' }))]),
        ]),
      ]),
    ]),
  ],
  templateUrl: './open-close.component.html',
  styleUrls: ['./open-close.component.scss'],
})
export class OpenCloseComponent {
  isOpen = true;

  isDisabled = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  onAnimationEvent() {}
}
