import { MainComponent } from '@pages/business/way-to-pay/main';
import { HomeComponent } from '@pages/home';

export function homeComponent(): Promise<typeof HomeComponent> {
  const homeImport = import('@pages/home');
  const homePromise: Promise<typeof HomeComponent> = homeImport.then((component) => component.HomeComponent);

  return homePromise;
}
