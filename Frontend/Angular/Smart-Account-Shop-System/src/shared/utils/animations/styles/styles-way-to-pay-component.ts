import { AnimationStyleMetadata, query, style } from '@angular/animations';

const initialStyle: AnimationStyleMetadata = style({
  position: 'relative',
});

const resetStyle: AnimationStyleMetadata = style({
  position: 'absolute',
  width: '100%',
});

export const initialWaytopayStyle: AnimationStyleMetadata = style({
  transform: 'translateY(-1000px)',
  opacity: 0,
});

export const resetWaytopayStyle = [initialStyle, query(':enter,:leave', [resetStyle], { optional: true })];
