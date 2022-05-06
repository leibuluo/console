import { useQuery } from '@tkeel/console-hooks';
import { IdProviderType } from '@tkeel/console-types';

interface RequestParams {
  type: IdProviderType;
}

interface AipData {
  '@type': string;
  config: string;
}

interface Options {
  params: RequestParams;
}

export default function useAuthIdProviderTemplateQuery({ params }: Options) {
  return useQuery<AipData, RequestParams>({
    url: '/rudder/v1/oauth/id-provider/template',
    method: 'GET',
    params,
  });
}
