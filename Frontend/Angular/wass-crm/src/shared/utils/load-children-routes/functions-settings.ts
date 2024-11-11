import { Routes } from '@angular/router';

export async function settingsRoutes(): Promise<Routes> {
  const route = await import('@admin/settings/settings.routes');
  return route.SETTINGS_ROUTES;
}

export async function branchOfficesRoutes(): Promise<Routes> {
  const route = await import('@admin/settings/branch-offices/branch-offices.routes');
  return route.BRANCHOFFICES_ROUTES;
}
