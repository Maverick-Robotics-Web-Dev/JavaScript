import { PageNotFoundComponent } from '../../components/page-not-found/page-not-found.component';

export function pagenotfoundComponent(): Promise<typeof PageNotFoundComponent> {
  const pagenotfoundImport = import('../../components/page-not-found/page-not-found.component');
  const pagenotfoundPromise: Promise<typeof PageNotFoundComponent> = pagenotfoundImport.then((component) => component.PageNotFoundComponent);
  return pagenotfoundPromise;
}
