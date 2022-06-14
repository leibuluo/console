import { Box, Flex, HStack, RadioGroup, Text } from '@chakra-ui/react';
import {
  Control,
  Controller,
  Path,
  UseFieldArrayReturn,
  UseFormRegister,
  useWatch,
} from 'react-hook-form';

import { FormControl, FormField, Radio } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import { AddFilledIcon, TrashFilledIcon } from '@tkeel/console-icons';
import {
  TelemetryType,
  useDeviceDetailQuery,
} from '@tkeel/console-request-hooks';

import {
  durationOptions,
  enumOperatorOptions,
  numberOperatorOptions,
  polymerizeOptions,
} from '@/tkeel-console-plugin-tenant-alarm-policy/constants';
import {
  Operator,
  Polymerize,
  Time,
} from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/mutations/useCreatePolicyMutation';

const { TextField, SelectField } = FormField;

type BooleanOperator = Operator.Eq | Operator.Ne;

export interface DeviceCondition {
  telemetry: string | null;
  time?: Time | null;
  polymerize?: Polymerize | null;
  numberOperator?: Operator | null;
  enumOperator?: BooleanOperator | null;
  enumValue?: string | null;
  booleanOperator?: BooleanOperator | null;
  booleanValue?: string;
  numberValue?: string;
}

export const defaultDeviceCondition: DeviceCondition = {
  telemetry: null,
  time: Time.OneMinute,
  polymerize: Polymerize.Avg,
  numberOperator: Operator.Gt,
  numberValue: '',
};

interface Props<FormValues> {
  deviceId: string;
  register: UseFormRegister<FormValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FormValues, any>;
  append: () => void;
  fieldArrayReturn: UseFieldArrayReturn<FormValues>;
}

interface TelemetryInfo {
  id: string;
  name: string;
  type: TelemetryType;
}

export function getTelemetryInfo(telemetry: string) {
  return JSON.parse(telemetry || '{}') as TelemetryInfo;
}

export default function DeviceRuleDescriptionCard<FormValues>({
  deviceId,
  register,
  control,
  append,
  fieldArrayReturn,
}: Props<FormValues>) {
  const { deviceObject } = useDeviceDetailQuery({ id: deviceId });
  const telemetryFields =
    deviceObject?.configs?.telemetry?.define?.fields || {};
  const telemetryOptions = Object.entries(telemetryFields).map(
    ([key, value]) => ({
      label: value.name,
      value: JSON.stringify({ id: key, name: value.name, type: value.type }),
    })
  );

  const { fields, remove } = fieldArrayReturn;

  const output = useWatch({
    name: 'deviceConditions' as Path<FormValues>,
    control,
  });

  const primaryColor = useColor('primary');

  const selectProps = {
    control,
    formControlStyle: { marginBottom: '0' },
  };

  const getFieldId = (i: number, id: string) => {
    return `deviceConditions.${i}.${id}` as Path<FormValues>;
  };

  return (
    <Flex flex="1" flexDirection="column">
      <Flex justifyContent="space-between">
        <Flex alignItems="center" color="gray.700" fontSize="14px">
          <Text>满足</Text>
          <FormControl
            id="condition"
            formControlStyle={{ marginBottom: '0', width: 'auto' }}
          >
            <Controller
              name={'condition' as Path<FormValues>}
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioGroup
                  padding="0 10px"
                  onChange={onChange}
                  value={value as string}
                >
                  <Radio value="or">
                    <Text color="gray.700">or</Text>
                  </Radio>
                  <Radio marginLeft="20px" value="and">
                    <Text color="gray.700">and</Text>
                  </Radio>
                </RadioGroup>
              )}
            />
          </FormControl>
          <Text>条件时，触发告警。</Text>
        </Flex>
        <Flex
          alignItems="center"
          cursor="pointer"
          _hover={{
            svg: {
              fill: `${primaryColor} !important`,
            },
            p: {
              color: primaryColor,
            },
          }}
          onClick={() => append()}
        >
          <AddFilledIcon color="grayAlternatives.300" />
          <Text color="grayAlternatives.300" fontSize="12px" fontWeight="500">
            添加规则
          </Text>
        </Flex>
      </Flex>
      <Flex flexDirection="column" marginTop="20px">
        {fields.map((item, i) => {
          /* eslint-disable @typescript-eslint/no-unsafe-member-access */
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const { telemetry, time } = output[i] || {};

          const { id: telemetryId } = getTelemetryInfo(telemetry as string);
          /* eslint-enable */
          const { type, define } = telemetryFields[telemetryId] || {};
          const typeIsNumber = [
            TelemetryType.Int,
            TelemetryType.Float,
            TelemetryType.Double,
          ].includes(type);
          const telemetryIsNumber = !telemetryId || typeIsNumber;

          // TODO: 遥测属性暂时不支持添加枚举类型值，支持后需要做处理
          const telemetryIsEnum = false;
          const telemetryIsBoolean = type === TelemetryType.Bool;

          const booleanAttributeOptions = Object.entries(define || {})
            .map(([key, value]) => ({
              label: value as string,
              value: key,
            }))
            .filter(({ value }) => value !== 'ext');

          const telemetryFieldId =
            `deviceConditions.${i}.telemetry` as Path<FormValues>;

          return (
            <HStack
              key={item.id}
              alignItems="center"
              spacing="8px"
              _notLast={{ marginBottom: '8px' }}
              padding="0 16px"
              height="64px"
              borderRadius="4px"
              backgroundColor="white"
              _hover={{
                '> div:last-child > svg': {
                  display: 'block !important',
                },
              }}
            >
              <Text
                marginRight="10px"
                color="gray.700"
                fontSize="14px"
                fontWeight="500"
              >
                if
              </Text>
              <SelectField<FormValues>
                id={telemetryFieldId}
                name={telemetryFieldId}
                placeholder="请选择"
                options={telemetryOptions}
                control={control}
                formControlStyle={{
                  marginBottom: '0',
                  flexShrink: 0,
                  width: '140px',
                }}
              />
              {telemetryIsNumber && (
                <>
                  <SelectField<FormValues>
                    id={getFieldId(i, 'time')}
                    name={getFieldId(i, 'time')}
                    placeholder="请选择"
                    options={durationOptions}
                    {...selectProps}
                  />
                  {time !== Time.Immediate && (
                    <SelectField<FormValues>
                      id={getFieldId(i, 'polymerize')}
                      name={getFieldId(i, 'polymerize')}
                      placeholder="请选择"
                      options={polymerizeOptions}
                      {...selectProps}
                    />
                  )}
                </>
              )}
              <SelectField<FormValues>
                id={getFieldId(i, 'operator')}
                name={getFieldId(i, 'operator')}
                placeholder="运算符"
                options={numberOperatorOptions}
                {...selectProps}
                formControlStyle={{
                  flexShrink: 0,
                  width: '122px',
                }}
              />
              {telemetryIsNumber && (
                <SelectField<FormValues>
                  id={getFieldId(i, 'numberOperator')}
                  name={getFieldId(i, 'numberOperator')}
                  placeholder="运算符"
                  options={numberOperatorOptions}
                  {...selectProps}
                  formControlStyle={{
                    flexShrink: 0,
                    width: '122px',
                  }}
                />
              )}
              {telemetryIsEnum && (
                <>
                  <SelectField<FormValues>
                    id={getFieldId(i, 'enumOperator')}
                    name={getFieldId(i, 'enumOperator')}
                    placeholder="运算符"
                    options={enumOperatorOptions}
                    {...selectProps}
                  />
                  <SelectField<FormValues>
                    id={getFieldId(i, 'enumValue')}
                    name={getFieldId(i, 'enumValue')}
                    placeholder="请选择"
                    options={[]}
                    {...selectProps}
                  />
                </>
              )}
              {telemetryIsBoolean && (
                <>
                  <SelectField<FormValues>
                    id={getFieldId(i, 'booleanOperator')}
                    name={getFieldId(i, 'booleanOperator')}
                    placeholder="运算符"
                    options={enumOperatorOptions}
                    {...selectProps}
                  />
                  <SelectField<FormValues>
                    id={getFieldId(i, 'booleanValue')}
                    name={getFieldId(i, 'booleanValue')}
                    placeholder="请选择"
                    options={booleanAttributeOptions}
                    {...selectProps}
                  />
                </>
              )}
              {telemetryIsNumber && (
                <TextField
                  id={getFieldId(i, 'numberValue')}
                  registerReturn={register(getFieldId(i, 'numberValue'))}
                  type="number"
                  formControlStyle={{ marginBottom: '0' }}
                />
              )}
              <Box width="16px" flexShrink={0}>
                {fields.length > 1 && (
                  <TrashFilledIcon
                    color="grayAlternatives.300"
                    style={{
                      display: 'none',
                      flexShrink: 0,
                      cursor: 'pointer',
                    }}
                    onClick={() => remove(i)}
                  />
                )}
              </Box>
            </HStack>
          );
        })}
      </Flex>
    </Flex>
  );
}
