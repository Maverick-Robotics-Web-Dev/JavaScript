import { animate, animateChild, AnimationTriggerMetadata, keyframes, query, style, transition, trigger } from '@angular/animations';

export const modalSuccessComponentAnimations: AnimationTriggerMetadata[] = [
  trigger('animateChildren', [transition(':enter, :leave', [query('@*', animateChild(), { optional: true })])]),
  trigger('modalFadeInOut', [
    transition(':enter', [style({ opacity: 0 }), animate('0.15s linear', style({ opacity: 1 }))]),
    transition(':leave', [style({ opacity: 1 }), animate('0.15s linear', style({ opacity: 0 }))]),
  ]),
  trigger('modalTranslate', [
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

// export const modalSuccessComponentAnimations: AnimationTriggerMetadata[] = [
//   trigger('animateChildren', [transition(':enter, :leave', [query('@*', animateChild(), { optional: true })])]),
//   trigger('showModal', [
//     transition(':enter', [
//       animate(
//         '0.3s',
//         keyframes([
//           style({ transform: 'scale(0.7)', offset: 0 }),
//           style({ transform: 'scale(1.05)', offset: 0.45 }),
//           style({ transform: 'scale(0.95)', offset: 0.8 }),
//           style({ transform: 'scale(1)', offset: 1 }),
//         ])
//       ),
//     ]),
//     transition(':leave', [
//       animate(
//         '0.25s',
//         keyframes([style({ transform: 'scale(1)', opacity: 1, offset: 0 }), style({ transform: 'scale(0.5)', opacity: 0, offset: 1 })])
//       ),
//     ]),
//   ]),
//   trigger('showBtn', [
//     transition(':enter', [animate('0.15s', keyframes([style({ transform: 'scale(0)', offset: 0 }), style({ transform: 'scale(1)', offset: 1 })]))]),
//   ]),
// ];
