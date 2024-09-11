import { animate, AnimationAnimateMetadata, style } from '@angular/animations';

export const enterAdminAnimate: AnimationAnimateMetadata = animate(
  '0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  style({ transform: 'translateX(0)', opacity: 1 })
);
export const leaveAdminAnimate: AnimationAnimateMetadata = animate(
  '0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530)',
  style({ transform: 'translateX(1000px)', opacity: 0 })
);
