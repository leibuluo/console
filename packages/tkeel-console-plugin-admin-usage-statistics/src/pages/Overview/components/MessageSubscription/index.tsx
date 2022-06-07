import { Box, HStack } from '@chakra-ui/react';
import * as dayjs from 'dayjs';

import { getTimestamp } from '@tkeel/console-utils';

import usePrometheusTKMeterQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterQuery';
import useTenantId from '@/tkeel-console-plugin-admin-usage-statistics/hooks/useTenantId';

import ModuleHeader from '../ModuleHeader';
import MessageSubscriptionBox from './MessageSubscriptionBox';

const et = getTimestamp();
const st = dayjs(et).subtract(6, 'day').startOf('day').valueOf();
const step = '1h';

export default function MessageSubscription() {
  const tenantId = useTenantId();
  const params = { et, st, step, tenant_id: tenantId };

  const r = usePrometheusTKMeterQuery({
    params: { ...params, meter: 'upstream_msg' },
  });
  // eslint-disable-next-line no-console
  console.log(r);

  return (
    <Box width="100%">
      <ModuleHeader
        title="消息订阅"
        description="平台消息吞吐"
        link="../message"
      />
      <HStack spacing="12px">
        <MessageSubscriptionBox title="上行消息 (条)">1</MessageSubscriptionBox>
        <MessageSubscriptionBox title="下行消息 (条)">2</MessageSubscriptionBox>
        <MessageSubscriptionBox title="订阅消息 (条)">3</MessageSubscriptionBox>
      </HStack>
    </Box>
  );
}
