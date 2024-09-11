import { Routes } from '@angular/router';

export async function websiteRoutes(): Promise<Routes> {
  const route = await import('@website/website.routes');
  return route.WEBSITE_ROUTES;
}
