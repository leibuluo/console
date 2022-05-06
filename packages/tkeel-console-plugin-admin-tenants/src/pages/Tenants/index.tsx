import { Box, Button, Flex, Text, Theme, useTheme } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cell, Column } from 'react-table';

import {
  ButtonsHStack,
  Empty,
  PageHeader,
  SearchInput,
  Table,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { GroupTwoToneIcon } from '@tkeel/console-icons';
import { formatDateTimeByTimestamp, plugin } from '@tkeel/console-utils';

import DeleteTenantButton from '@/tkeel-console-plugin-admin-tenants/components/DeleteTenantButton';
import ModifyTenantButton from '@/tkeel-console-plugin-admin-tenants/components/ModifyTenantButton';
import {
  AUTH_TYPE_MAP,
  DEFAULT_AUTH_TYPE_VALUE,
} from '@/tkeel-console-plugin-admin-tenants/constants';
import useTenantsQuery, {
  Admin,
  Tenant,
} from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useTenantsQuery';

import CreateTenantButton from './components/CreateTenantButton';

export default function Tenants() {
  const toast = plugin.getPortalToast();
  const { colors }: Theme = useTheme();
  const navigate = useNavigate();
  const [keyWords, setKeyWords] = useState('');
  const pagination = usePagination();
  const { pageNum, pageSize, setPageNum, setTotalSize } = pagination;

  let params = {
    page_num: pageNum,
    page_size: pageSize,
    order_by: 'created_at',
    is_descending: true,
    key_words: '',
  };
  if (keyWords) {
    params = { ...params, key_words: keyWords };
  }

  const { isLoading, isSuccess, total, tenants, refetch } = useTenantsQuery({
    params,
  });

  if (isSuccess) {
    setTotalSize(total);
  }

  const handleCreateTenantSuccess = () => {
    toast('创建成功', { status: 'success' });
    refetch();
  };

  const handleModifyTenantSuccess = () => {
    toast('编辑成功', { status: 'success' });
    refetch();
  };

  const handleDeleteTenantSuccess = () => {
    toast('删除成功', { status: 'success' });
    refetch();
  };

  const columns: ReadonlyArray<Column<Tenant>> = [
    {
      Header: '租户空间',
      accessor: 'title',
      Cell: ({ value, row }: Cell<Tenant>) =>
        useMemo(
          () => (
            <Button
              size="small"
              variant="link"
              color="gray.800"
              onClick={() => navigate(`${row?.original?.tenant_id}`)}
            >
              {value}
            </Button>
          ),
          [row?.original?.tenant_id, value]
        ),
    },
    {
      Header: '认证方式',
      accessor: 'auth_type',
      Cell: ({ value }) =>
        (AUTH_TYPE_MAP[value] ?? AUTH_TYPE_MAP[DEFAULT_AUTH_TYPE_VALUE]).label,
    },
    { Header: '租户 ID', accessor: 'tenant_id' },
    {
      Header: '管理员账号',
      accessor: 'admins',
      Cell: ({ value = [] }: { value: Admin[] }) => {
        const usernames = value.map(({ username }) => username);
        return useMemo(
          () => <Text isTruncated>{usernames.join('，')}</Text>,
          [usernames]
        );
      },
    },
    {
      Header: '创建时间',
      accessor: 'created_at',
      Cell({ value }) {
        return value ? formatDateTimeByTimestamp({ timestamp: value }) : '';
      },
    },
    { Header: '备注', accessor: 'remark' },
    { Header: '用户数', accessor: 'num_user' },
    {
      Header: '操作',
      Cell: ({ row }: Cell<Tenant>) =>
        useMemo(() => {
          const { original } = row;

          return (
            <ButtonsHStack>
              <ModifyTenantButton
                variant="link"
                data={original}
                onSuccess={handleModifyTenantSuccess}
              />
              <DeleteTenantButton
                variant="link"
                data={original}
                onSuccess={handleDeleteTenantSuccess}
              />
            </ButtonsHStack>
          );
        }, [row]),
    },
  ];

  return (
    <Flex paddingTop="16px" flexDirection="column" height="100%">
      <PageHeader
        icon={<GroupTwoToneIcon size="26px" />}
        name="租户管理"
        desc="管理租户空间，管理租户空间用户。"
      />
      <Flex
        flexDirection="column"
        flex="1"
        marginTop="16px"
        padding="0 20px"
        backgroundColor="white"
        boxShadow="xl"
        overflow="hidden"
      >
        <Flex alignItems="center" height="40px" margin="16px 0">
          <Box flex="1" marginRight="16px">
            <SearchInput
              width="100%"
              placeholder="搜索"
              inputStyle={{ backgroundColor: colors.gray[50] }}
              onSearch={(value) => {
                setPageNum(1);
                setKeyWords(value.trim());
              }}
            />
          </Box>
          <CreateTenantButton onSuccess={handleCreateTenantSuccess} />
        </Flex>
        <Table
          columns={columns}
          data={tenants}
          paginationProps={pagination}
          scroll={{ y: 'scroll' }}
          isLoading={isLoading}
          empty={
            <Empty
              title="暂无空间"
              description="您可前往页面右上角「创建租户空间」"
              styles={{ wrapper: { height: '100%' } }}
            />
          }
          styles={{
            wrapper: {
              flex: 1,
              overflow: 'hidden',
              backgroundColor: 'whiteAlias',
            },
          }}
        />
      </Flex>
    </Flex>
  );
}
