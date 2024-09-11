export const waytopayRoutes = () =>
  import('./way-to-pay.routes').then((route) => route.routes);
