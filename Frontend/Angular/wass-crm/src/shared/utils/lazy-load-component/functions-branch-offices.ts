import { BranchOfficesComponent } from '@admin/settings/branch-offices';
import { ListComponent } from '@admin/settings/branch-offices/list';

export async function branchOfficesComponent(): Promise<typeof BranchOfficesComponent> {
  const component = await import('@admin/settings/branch-offices');
  return component.BranchOfficesComponent;
}

export async function listComponent(): Promise<typeof ListComponent> {
  const component = await import('@admin/settings/branch-offices/list');
  return component.ListComponent;
}
