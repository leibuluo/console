import { ALARM_LEVEL_INFO_MAP } from '@tkeel/console-business-components';

export { ALARM_TYPE_OPTIONS } from '@tkeel/console-business-components';

export const ALARM_LEVEL_MAP = {
  1: '紧急',
  2: '重要',
  3: '次要',
  4: '提示',
};

export const ALARM_LEVEL_OPTIONS = Object.entries(ALARM_LEVEL_INFO_MAP).map(
  ([key, value]) => ({
    label: value.label,
    value: key,
  })
);

export const ALARM_RULE_TYPE_MAP = {
  0: '阈值告警',
  1: '系统告警',
};

export const ALARM_TYPE_MAP = {
  0: '基础告警',
  1: '持续告警',
};

export const RULE_STATUS_MAP = {
  0: '停用',
  1: '启用',
};
