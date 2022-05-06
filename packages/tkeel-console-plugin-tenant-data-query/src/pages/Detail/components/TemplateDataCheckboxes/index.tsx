import { Box, Center, Image } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

import { Loading, Tree } from '@tkeel/console-components';

import propertiesEmpty from '@/tkeel-console-plugin-tenant-data-query/assets/images/properties-empty.svg';
import { TelemetryFields } from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceDetailQuery';

type Props = {
  telemetry: TelemetryFields;
  checkedKeys: string[];
  setCheckedKeys: Dispatch<SetStateAction<string[]>>;
  isDeviceDetailLoading: boolean;
};

export default function TemplateDataCheckboxes({
  telemetry,
  checkedKeys,
  setCheckedKeys,
  isDeviceDetailLoading,
}: Props) {
  const telemetryKeys = Object.keys(telemetry);

  const children = telemetryKeys.map((key) => ({
    title: telemetry[key].name,
    id: key,
    key,
  }));

  const treeData = [
    {
      title: '遥测数据',
      id: 'telemetryData',
      key: 'telemetryData',
      children,
    },
  ];

  if (isDeviceDetailLoading) {
    return <Loading styles={{ wrapper: { flex: '1' } }} />;
  }

  if (children.length === 0) {
    return (
      <Center flex="1">
        <Image src={propertiesEmpty} />
      </Center>
    );
  }

  return (
    <Box flex="1" padding="10px 20px">
      <Tree
        treeData={treeData}
        checkable
        defaultExpandAll
        checkedKeys={checkedKeys}
        selectable={false}
        onCheck={(keys) => {
          const checkedNodeKeys = (keys as string[]).filter(
            (key) => key !== 'telemetryData'
          );
          setCheckedKeys(checkedNodeKeys);
        }}
      />
    </Box>
  );
}
