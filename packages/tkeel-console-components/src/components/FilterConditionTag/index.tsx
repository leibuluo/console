import { Box, Flex, StyleProps, Text } from '@chakra-ui/react';

import { CloseFilledIcon } from '@tkeel/console-icons';

export interface FilterConditionInfo {
  id: string;
  label: string;
  value: string;
}

type Props = {
  condition: FilterConditionInfo;
  styles?: {
    wrapper?: StyleProps;
    label?: StyleProps;
    value?: StyleProps;
  };
  removeCondition: (conditionId: string) => unknown;
};

export default function FilterConditionTag({
  condition,
  styles,
  removeCondition,
}: Props) {
  const { id, label, value } = condition;
  return (
    <Flex
      marginRight="10px"
      flexShrink={0}
      position="relative"
      paddingLeft="5px"
      paddingRight="4px"
      height="24px"
      borderRadius="4px"
      alignItems="center"
      fontSize="12px"
      lineHeight="24px"
      {...styles?.wrapper}
    >
      <Box
        position="absolute"
        left="0"
        top="0"
        width="100%"
        height="100%"
        paddingLeft="5px"
        paddingRight="3px"
        borderRadius="4px"
        backgroundColor="primary"
        opacity="0.15"
        title={value}
      />
      {label && (
        <Text color="primary" fontWeight="500" {...styles?.label}>
          {label}：
        </Text>
      )}
      {value && (
        <>
          <Text margin="0 8px 0 3px" color="gray.600" {...styles?.value}>
            {value}
          </Text>
          <CloseFilledIcon
            style={{ position: 'relative', zIndex: '1', cursor: 'pointer' }}
            onClick={() => removeCondition(id)}
          />
        </>
      )}
    </Flex>
  );
}
