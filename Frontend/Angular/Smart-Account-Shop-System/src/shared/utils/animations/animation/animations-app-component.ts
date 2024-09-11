import {
  animate,
  AnimationAnimateMetadata,
  AnimationQueryOptions,
  AnimationStyleMetadata,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
// import { enterAppStyle, initialAdminStyle, initialAppStyle, leaveAppStyle, resetAdminStyle, resetAppStyle } from '../styles';
import { initialAdminStyle, initialAppStyle, initialWaytopayStyle, resetAdminStyle, resetAppStyle, resetWaytopayStyle } from '../styles';
import { enterAdminAnimate, enterAppAnimate, enterWaytopayAnimate, leaveAdminAnimate, leaveAppAnimate, leaveWaytopayAnimate } from '../animate';

const optionAnimation: AnimationQueryOptions | null = { optional: true };

export const routeAnimation = trigger('routeAnimation', [
  transition('homeAdmin<=>*', [
    ...resetAdminStyle,
    query(':enter', [initialAdminStyle], optionAnimation),
    group([query(':leave', [leaveAdminAnimate], optionAnimation), query(':enter', [enterAdminAnimate], optionAnimation)]),
  ]),
  transition('mainwaytopay<=>*', [
    ...resetWaytopayStyle,
    query(':enter', [initialWaytopayStyle], optionAnimation),
    group([query(':leave', [leaveWaytopayAnimate], optionAnimation), query(':enter', [enterWaytopayAnimate], optionAnimation)]),
  ]),
  transition('*<=>*', [
    ...resetAppStyle,
    query(':enter', [initialAppStyle], optionAnimation),
    group([query(':leave', [leaveAppAnimate], optionAnimation), query(':enter', [enterAppAnimate], optionAnimation)]),
  ]),
]);
