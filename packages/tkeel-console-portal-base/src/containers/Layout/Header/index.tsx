import { Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { Menu } from '@tkeel/console-types';

type Props = {
  menus: Menu[];
  userActionMenusComponent: ReactNode;
};

export default function Header({ menus, userActionMenusComponent }: Props) {
  const { pathname } = useLocation();
  let breadcrumbs: string[] = [];

  menus.forEach((menu) => {
    const { name, path, children } = menu;
    if (Array.isArray(children) && children.length > 0) {
      const menuItem = children.find((item) =>
        pathname.includes(item.path as string)
      );
      if (menuItem) {
        breadcrumbs = [name, menuItem.name];
      }
    } else if (pathname.includes(path as string)) {
      breadcrumbs = [name];
    }
  });

  const textStyle = {
    color: 'grayAlternatives.500',
    fontSize: '12px',
    fontWeight: '500',
  };

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      height="48px"
      padding="0 20px"
    >
      <Flex>
        {breadcrumbs.map((crumb, i) => (
          <Flex key={String(i + 1)} alignItems="center">
            <Text key="crumb" {...textStyle}>
              {crumb}
            </Text>
            {i < breadcrumbs.length - 1 && (
              <Text margin="0" {...textStyle}>
                /
              </Text>
            )}
          </Flex>
        ))}
      </Flex>
      <Flex alignItems="center">{userActionMenusComponent}</Flex>
    </Flex>
  );
}
