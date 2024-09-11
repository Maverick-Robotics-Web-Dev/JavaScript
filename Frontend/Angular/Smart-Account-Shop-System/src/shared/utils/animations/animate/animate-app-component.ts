import { animate, AnimationAnimateMetadata, style } from '@angular/animations';

// export const enterAppAnimate: AnimationAnimateMetadata = animate('3s 0s ease', style({ opacity: 1, transform: 'translateY(0)' }));
// export const leaveAppAnimate: AnimationAnimateMetadata = animate('2s 0s ease', style({ opacity: 0, transform: 'scale(0.6)' }));
// animation: name duration timing-function delay iteration-count direction fill-mode;

// export const enterAppAnimate: AnimationAnimateMetadata = animate(
//   '0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)',
//   style({ transform: 'scale(1)', opacity: 1 })
// );
// export const leaveAppAnimate: AnimationAnimateMetadata = animate(
//   '0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530)',
//   style({ transform: 'scale(0)', opacity: 1 })
// );

export const enterAppAnimate: AnimationAnimateMetadata = animate('300ms ease-out', style({ opacity: 1 }));
export const leaveAppAnimate: AnimationAnimateMetadata = animate('300ms ease-out', style({ opacity: 0 }));
