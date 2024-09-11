import { HomeComponent } from '@website/home/home.component';

export async function homeComponent(): Promise<typeof HomeComponent> {
  const component = await import('@website/home/home.component');
  return component.HomeComponent;
}
