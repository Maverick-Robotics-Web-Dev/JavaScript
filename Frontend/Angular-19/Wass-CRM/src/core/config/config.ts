import { environment } from '@environments/environment.development';

export const API_URL = environment.API_URL;
export const BRANCHOFFICES_URL = `${API_URL}/settings/branch-offices`;
