import { AnimationStyleMetadata, query, style } from '@angular/animations';

const initialStyle: AnimationStyleMetadata = style({
  position: 'relative',
});

const resetStyle: AnimationStyleMetadata = style({
  position: 'absolute',
  // top: 0,
  // left: 0,
  width: '100%',
});

export const initialAdminStyle: AnimationStyleMetadata = style({
  // left: '-100%',
  transform: 'translateX(-1000px)',
  opacity: 0,
});

export const resetAdminStyle = [initialStyle, query(':enter,:leave', [resetStyle], { optional: true })];
