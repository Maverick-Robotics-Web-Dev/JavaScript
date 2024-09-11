import { LoginComponent } from '@pages/auth/login';

export function loginComponent(): Promise<typeof LoginComponent> {
  const loginImport = import('@pages/auth/login');
  const loginPromise: Promise<typeof LoginComponent> = loginImport.then((component) => component.LoginComponent);

  return loginPromise;
}
