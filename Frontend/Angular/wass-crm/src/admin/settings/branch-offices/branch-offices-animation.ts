import { animate, animateChild, AnimationTriggerMetadata, query, style, transition, trigger } from '@angular/animations';

export const createComponentAnimations: AnimationTriggerMetadata[] = [
  // trigger('animateChildren', [transition('* => void', [query('@*', [animateChild()])])]),
  trigger('animateChildren', [transition(':enter, :leave', [query('@*', animateChild(), { optional: true })])]),
  trigger('fadeInOut', [
    transition(':enter', [style({ opacity: 0 }), animate('0.15s linear', style({ opacity: 1 }))]),
    transition(':leave', [style({ opacity: 1 }), animate('0.15s linear', style({ opacity: 0 }))]),
  ]),
  trigger('transformTranslate', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translate(0,-50px)' }),
      animate('0.3s ease-out', style({ opacity: 1, transform: 'none' })),
    ]),
    transition(':leave', [
      style({ opacity: 1, transform: 'none' }),
      animate('0.3s ease-out', style({ opacity: 0, transform: 'translate(0,-50px)' })),
    ]),
  ]),
];
