import { AnimationStyleMetadata, query, style } from '@angular/animations';

// const initialStyle: AnimationStyleMetadata = style({
//   position: 'relative',
// });

// const resetStyle: AnimationStyleMetadata = style({
//   position: 'absolute',
//   width: '100%',
// });

// export const initialAppStyle: AnimationStyleMetadata = style({
//   transform: 'scaleX(0)',
//   opacity: 1,
// });

// export const resetAppStyle = [initialStyle, query(':enter,:leave', [resetStyle], { optional: true })];

const initialStyle: AnimationStyleMetadata = style({
  position: 'relative',
});

const resetStyle: AnimationStyleMetadata = style({
  position: 'absolute',
  opacity: 0,
  width: '100%',
});

export const initialAppStyle: AnimationStyleMetadata = style({
  // transform: 'scaleX(0)',
  opacity: 0,
});

export const resetAppStyle = [initialStyle, query(':enter,:leave', [resetStyle], { optional: true })];
