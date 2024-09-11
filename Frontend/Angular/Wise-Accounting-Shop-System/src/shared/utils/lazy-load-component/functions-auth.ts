import { LoginComponent } from '@admin/auth/login/login.component';

export async function loginComponent(): Promise<typeof LoginComponent> {
  const component = await import('@admin/auth/login/login.component');
  return component.LoginComponent;
}
