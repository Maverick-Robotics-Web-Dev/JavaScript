import { CreateComponent } from '@pages/business/way-to-pay/create';
import { DetailComponent } from '@pages/business/way-to-pay/detail';
import { EditComponent } from '@pages/business/way-to-pay/edit';
import { MainComponent } from '@pages/business/way-to-pay/main';

export function mainComponent(): Promise<typeof MainComponent> {
  const waytopayImport = import('@pages/business/way-to-pay/main');
  const waytopayPromise: Promise<typeof MainComponent> = waytopayImport.then((component) => component.MainComponent);

  return waytopayPromise;
}

export function detailComponent(): Promise<typeof DetailComponent> {
  const waytopayImport = import('@pages/business/way-to-pay/detail');
  const waytopayPromise: Promise<typeof DetailComponent> = waytopayImport.then((component) => component.DetailComponent);

  return waytopayPromise;
}

export function createComponent(): Promise<typeof CreateComponent> {
  const waytopayImport = import('@pages/business/way-to-pay/create');
  const waytopayPromise: Promise<typeof CreateComponent> = waytopayImport.then((component) => component.CreateComponent);

  return waytopayPromise;
}

export function updateComponent(): Promise<typeof EditComponent> {
  const waytopayImport = import('@pages/business/way-to-pay/edit');
  const waytopayPromise: Promise<typeof EditComponent> = waytopayImport.then((component) => component.EditComponent);

  return waytopayPromise;
}
