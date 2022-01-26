import BaseUserModal, {
  FormValues,
} from '@/tkeel-console-plugin-tenant-users/pages/Index/components/BaseUserModal';

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

export default function CreateUserModal({
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BaseUserModal
      title="编辑用户"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
