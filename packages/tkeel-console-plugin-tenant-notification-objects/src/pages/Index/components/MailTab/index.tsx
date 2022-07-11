import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import { memo } from 'react';
import { useForm } from 'react-hook-form';

import { FormField } from '@tkeel/console-components';
import { schemas } from '@tkeel/console-utils';

import useEmailQuery from '@/tkeel-console-plugin-tenant-notification-objects/hooks/queries/useEmailQuery';

import MailForm from '../MailForm';

const { TextField } = FormField;

interface Props {
  noticeId: number;
}

interface MailFormFields {
  name: string;
  [mailName: string]: string;
}

function MailTab({ noticeId }: Props) {
  const { emails, refetch } = useEmailQuery({ params: { noticeId } });
  const totalCount = emails.length;

  const {
    register,
    formState: { errors },
  } = useForm<MailFormFields>();

  return (
    <Box>
      <Flex alignItems="center" mb="16px">
        <TextField
          placeholder="请输入接收人邮箱"
          id="emailAddress"
          error={errors.emailAddress}
          registerReturn={register(
            'emailAddress',
            schemas.singleMail.registerOptions
          )}
          formHelperStyle={{ fontSize: '12px', position: 'absolute' }}
          formControlStyle={{ width: '450px', mb: '0' }}
          inputStyle={{ backgroundColor: 'white' }}
        />
        <TextField
          placeholder="请输入接收人名称"
          id="userName"
          error={errors.userName}
          registerReturn={register('userName')}
          formHelperStyle={{ fontSize: '12px', position: 'absolute' }}
          formControlStyle={{
            width: '160px',
            margin: '0 12px 0 8px',
          }}
          inputStyle={{ backgroundColor: 'white' }}
        />
        <Button
          type="button"
          variant="outline"
          color="gray.700"
          bgColor="grayAlternatives.50"
          borderWidth="1px"
          borderColor="grayAlternatives.100"
          boxShadow="none"
          _hover={{ bgColor: 'grayAlternatives.50' }}
          _focus={{ bgColor: 'grayAlternatives.50' }}
          onClick={() => {}}
        >
          添加联系邮箱
        </Button>
      </Flex>
      <VStack spacing="8px">
        {emails.map((data) => (
          <MailForm
            key={data.id}
            data={data}
            totalCount={totalCount}
            refetch={refetch}
          />
        ))}
      </VStack>
    </Box>
  );
}

export default memo(MailTab);
