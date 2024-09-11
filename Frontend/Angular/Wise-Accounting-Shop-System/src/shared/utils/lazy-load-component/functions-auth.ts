import { LoginComponent } from '@auth/login';

export async function loginComponent(): Promise<typeof LoginComponent> {
  const component = await import('@auth/login');
  return component.LoginComponent;
}
