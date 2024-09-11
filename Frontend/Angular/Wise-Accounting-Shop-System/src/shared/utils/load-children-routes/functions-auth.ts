import { Routes } from '@angular/router';

export async function authRoutes(): Promise<Routes> {
  const route = await import('@admin/auth/auth.routes');
  return route.AUTH_ROUTES;
}
