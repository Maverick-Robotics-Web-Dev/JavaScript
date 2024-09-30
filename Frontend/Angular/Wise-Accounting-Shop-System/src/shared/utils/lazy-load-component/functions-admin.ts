import { DashboardComponent } from '@admin/dashboard';

export async function dashboardComponent(): Promise<typeof DashboardComponent> {
  const component = await import('@admin/dashboard');
  return component.DashboardComponent;
}
