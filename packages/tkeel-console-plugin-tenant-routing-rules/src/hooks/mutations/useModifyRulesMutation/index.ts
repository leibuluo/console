import { useMutation } from '@tkeel/console-hooks';

export interface RequestData {
  name: string;
  type: number;
  desc: string;
}

export interface ApiData {
  '@type': string;
}

const method = 'PUT';

export default function useModifyRulesMutation({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess: () => void;
}) {
  const url = `/rule-manager/v1/rules/${id}`;
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
