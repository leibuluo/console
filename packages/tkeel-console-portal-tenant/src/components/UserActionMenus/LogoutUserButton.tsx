import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { ShutdownFilledIcon } from '@tkeel/console-icons';
import { getLocalTokenInfo, removeLocalTokenInfo } from '@tkeel/console-utils';

import useRevokeTokenMutation from '@/tkeel-console-portal-tenant/hooks/mutations/useRevokeTokenMutation';

export default function LogoutUserButton() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, mutate, data } = useRevokeTokenMutation({
    onSuccess() {
      const tenantId = data?.tenant_id ?? '';
      removeLocalTokenInfo();
      navigate(`/auth/login/${tenantId}`, { replace: true });
    },
  });
  const handleConfirm = () => {
    const tokenInfo = getLocalTokenInfo();
    mutate({ data: { refresh_token: tokenInfo.refresh_token } });
  };

  return (
    <>
      <MoreActionButton
        title="退出登录"
        icon={<ShutdownFilledIcon />}
        onClick={onOpen}
      />
      <Alert
        isOpen={isOpen}
        icon="warning"
        iconPosition="left"
        title="您确定要退出登录吗"
        isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
