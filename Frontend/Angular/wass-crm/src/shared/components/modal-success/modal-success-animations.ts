import { animate, animateChild, AnimationTriggerMetadata, keyframes, query, style, transition, trigger } from '@angular/animations';

export const modalSuccessComponentAnimations: AnimationTriggerMetadata[] = [
  trigger('animateChildren', [transition('* => void', [query('@*', [animateChild()])])]),
  trigger('showModal', [
    transition(':enter', [
      animate(
        '0.3s',
        keyframes([
          style({ transform: 'scale(0.7)', offset: 0 }),
          style({ transform: 'scale(1.05)', offset: 0.45 }),
          style({ transform: 'scale(0.95)', offset: 0.8 }),
          style({ transform: 'scale(1)', offset: 1 }),
        ])
      ),
    ]),
    transition(':leave', [
      animate(
        '0.3s',
        keyframes([style({ transform: 'scale(1)', opacity: 1, offset: 0 }), style({ transform: 'scale(0.5)', opacity: 0, offset: 1 })])
      ),
    ]),
  ]),
];
