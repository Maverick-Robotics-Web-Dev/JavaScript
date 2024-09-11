import { HomeComponent } from '@pages/admin/home';

export function homeAdminComponent(): Promise<typeof HomeComponent> {
  const homeImport = import('@pages/admin/home');
  const homePromise: Promise<typeof HomeComponent> = homeImport.then((component) => component.HomeComponent);

  return homePromise;
}
