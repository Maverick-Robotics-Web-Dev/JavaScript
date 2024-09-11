import { DashboardComponent } from '@pages/admin/dashboard';

export function dashboarComponent(): Promise<typeof DashboardComponent> {
  const dashboardImport = import('@pages/admin/dashboard');
  const dashboardPromise: Promise<typeof DashboardComponent> = dashboardImport.then((component) => component.DashboardComponent);

  return dashboardPromise;
}
