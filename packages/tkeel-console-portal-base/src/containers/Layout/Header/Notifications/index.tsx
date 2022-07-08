import { Box, Flex, StyleProps, Text } from '@chakra-ui/react';

import { BellLightningFilledIcon } from '@tkeel/console-icons';

interface Props {
  sx?: StyleProps;
  styles?: {
    root?: StyleProps;
  };
}

export default function Notifications({ sx, styles }: Props) {
  return (
    <Flex
      flexDirection="column"
      width="400px"
      maxHeight="622px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.200"
      borderRadius="4px"
      boxShadow="0px 10px 15px rgba(113, 128, 150, 0.1), 0px 4px 6px rgba(113, 128, 150, 0.2)"
      backgroundColor="white"
      {...styles?.root}
      {...sx}
    >
      <Box width="100%" padding="0 20px">
        <Text
          height="52px"
          color="grayAlternatives.700"
          fontSize="14px"
          fontWeight="600"
          lineHeight="52px"
          borderBottomWidth="1px"
          borderBottomStyle="solid"
          borderBottomColor="gray.200"
        >
          通知
        </Text>
      </Box>
      <Flex flex="1" overflowY="auto" flexDirection="column">
        {Array.from({ length: 30 }).map((_, i) => (
          <Flex
            key={String(i + 1)}
            flexDirection="column"
            height="112px"
            flexShrink={0}
            padding="10px 20px"
            cursor="pointer"
            _hover={{ backgroundColor: 'gray.100' }}
          >
            <Flex alignItems="center">
              <BellLightningFilledIcon color="grayAlternatives.300" />
              <Text
                marginLeft="2px"
                color="grayAlternatives.700"
                fontSize="12px"
                fontWeight="600"
              >
                告警标题名称
              </Text>
            </Flex>
            <Text
              marginY="4px"
              color="grayAlternatives.700"
              fontSize="12px"
              lineHeight="22px"
            >
              这是一条报警信息这是一条报警信息这是一条报警信息这是一条报警信息
            </Text>
            <Text
              color="grayAlternatives.500"
              fontSize="12px"
              lineHeight="24px"
            >
              2022.07.08 12:22:19
            </Text>
          </Flex>
        ))}
      </Flex>
      <Box
        flexShrink={0}
        width="360px"
        marginLeft="20px"
        height="20px"
        borderTopWidth="1px"
        borderTopStyle="solid"
        borderTopColor="gray.200"
      />
    </Flex>
  );
}
