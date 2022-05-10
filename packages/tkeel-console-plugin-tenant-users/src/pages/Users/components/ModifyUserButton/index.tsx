import { useDisclosure } from '@chakra-ui/react';

import { LinkButton } from '@tkeel/console-components';
import { User } from '@tkeel/console-request-hooks';
import { AuthType } from '@tkeel/console-types';

import useModifyUserMutation from '@/tkeel-console-plugin-tenant-users/hooks/mutations/useModifyUserMutation';
import { FormValues } from '@/tkeel-console-plugin-tenant-users/pages/Users/components/BaseUserModal';
import ModifyUserModal from '@/tkeel-console-plugin-tenant-users/pages/Users/components/ModifyUserModal';

type Props = {
  authType: AuthType;
  data: User;
  onSuccess: () => void;
};

export default function ModifyUserButton({ authType, data, onSuccess }: Props) {
  const formFields = {
    username: {
      disabled: true,
    },
    nick_name: {
      disabled: authType === 'external',
    },
  };

  const {
    tenant_id: tenantId,
    user_id: userId,
    username,
    nick_name: nickName,
    roles,
  } = data;
  const defaultValues = {
    username,
    nick_name: nickName,
    roleIds: roles.map(({ id }) => id),
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useModifyUserMutation({
    tenantId,
    userId,
    onSuccess() {
      onSuccess();
      onClose();
    },
  });

  const handleConfirm = (formValues: FormValues) => {
    mutate({
      data: {
        nick_name: formValues?.nick_name ?? '',
        roles: formValues?.roleIds ?? [],
      },
    });
  };

  return (
    <>
      <LinkButton onClick={onOpen}>编辑</LinkButton>
      {isOpen && (
        <ModifyUserModal
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          formFields={formFields}
          defaultValues={defaultValues}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
