import { BranchOfficesComponent } from '@admin/settings/branch-offices';
import { BranchOfficesListComponent } from '@admin/settings/branch-offices/branch-offices-list';

export async function branchOfficesComponent(): Promise<typeof BranchOfficesComponent> {
  const component = await import('@admin/settings/branch-offices');
  return component.BranchOfficesComponent;
}

export async function listComponent(): Promise<typeof BranchOfficesListComponent> {
  const component = await import('@admin/settings/branch-offices/branch-offices-list');
  return component.BranchOfficesListComponent;
}
