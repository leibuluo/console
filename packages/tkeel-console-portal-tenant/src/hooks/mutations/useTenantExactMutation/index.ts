import { useMutation } from '@tkeel/console-hooks';
import { AuthType } from '@tkeel/console-types';

export interface RequestParams {
  tenant_id?: string;
  title?: string;
}

type ApiData = {
  '@type': string;
  auth_type: AuthType;
  tenant_id: string;
  title: string;
};

type Options = {
  onSuccess: ({ data }: { data: ApiData }) => void;
};

export default function useTenantExactMutation({ onSuccess }: Options) {
  return useMutation<ApiData, RequestParams>({
    url: '/security/v1/tenants/exact',
    method: 'GET',
    reactQueryOptions: { onSuccess },
    extras: {
      handleNoAuth: false,
    },
  });
}
