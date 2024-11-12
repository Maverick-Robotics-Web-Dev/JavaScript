import { DashboardComponent } from '@admin/dashboard';
import { SettingsComponent } from '@admin/settings';

export async function dashboardComponent(): Promise<typeof DashboardComponent> {
  const component = await import('@admin/dashboard');
  return component.DashboardComponent;
}

export async function settingsComponent(): Promise<typeof SettingsComponent> {
  const component = await import('@admin/settings');
  return component.SettingsComponent;
}
