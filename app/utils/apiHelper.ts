import { VercelEnv } from '@/interfaces';

export const apiEndpoint = (): string => {
  const mode = `${process.env.NEXT_PUBLIC_VERCEL_ENV}` as VercelEnv;
  const featureBranchApi: string = `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}/api`;
  const publicEndpointApi: string = `${process.env.NEXT_PUBLIC_API_ENDPOINT}`;
  return mode === 'preview' ? featureBranchApi : publicEndpointApi;
};
