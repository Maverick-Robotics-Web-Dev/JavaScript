import { Routes } from '@angular/router';

export async function adminRoutes(): Promise<Routes> {
  const route = await import('@admin/admin.routes');
  return route.ADMIN_ROUTES;
}
