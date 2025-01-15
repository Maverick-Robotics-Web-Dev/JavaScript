import { animate, animateChild, AnimationTriggerMetadata, query, style, transition, trigger } from '@angular/animations';

// export const createComponentAnimations = {
//   fadeInOut: trigger('fadeInOut', [
//     transition(':enter', [style({ opacity: 0 }), animate('0.15s linear', style({ opacity: 1 }))]),
//     transition(':leave', [style({ opacity: 1 }), animate('0.15s linear', style({ opacity: 0 }))]),
//   ]),
// };

export const createComponentAnimations = [
  trigger('animateChildren', [transition('* => void', [query('@*', [animateChild()])])]),
  ,
  trigger('fadeInOut', [
    transition(':enter', [style({ opacity: 0 }), animate('0.15s linear', style({ opacity: 1 }))]),
    transition(':leave', [style({ opacity: 1 }), animate('0.15s 0.1s linear', style({ opacity: 0 }))]),
  ]),
  trigger('transformTranslate', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translate(0,-50px)' }),
      animate('0.3s ease-out', style({ opacity: 1, transform: 'translate(0,0)' })),
    ]),
    transition(':leave', [
      style({ opacity: 1, transform: 'translate(0,0)' }),
      animate('0.3s ease-out', style({ opacity: 0, transform: 'translate(0,-50px)' })),
    ]),
  ]),
];

// export const fadeInOutAnimation: AnimationTriggerMetadata = trigger('fadeInOut', [
//   transition(':enter', [style({ opacity: 0 }), animate('0.15s linear', style({ opacity: 1 }))]),
//   transition(':leave', [style({ opacity: 1 }), animate('0.15s linear', style({ opacity: 0 }))]),
// ]);
