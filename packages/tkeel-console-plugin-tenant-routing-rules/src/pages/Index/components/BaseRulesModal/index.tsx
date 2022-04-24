import { HStack, useRadioGroup } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormControl, FormField, Modal } from '@tkeel/console-components';
// import { schemas } from '@tkeel/console-utils';
import { RoutesMsgIcon, RoutesTimeIcon } from '@tkeel/console-icons';
import { TemplateItem, useTemplatesQuery } from '@tkeel/console-request-hooks';

import Tip from '@/tkeel-console-plugin-tenant-routing-rules/components/Tip';
import RadioCard from '@/tkeel-console-plugin-tenant-routing-rules/pages/Index/components/RadioCard';

const { TextField, TextareaField, SelectField } = FormField;

export interface FormValues {
  name: string;
  type: number;
  desc?: string;
  deviceTemplate?: string;
  deviceTemplateId?: string;
  deviceTemplateName?: string;
}

type Props = {
  title: ReactNode;
  buttonType: string;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  defaultValues?: FormValues;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

export default function BaseRulesModal({
  title,
  buttonType,
  isOpen,
  isConfirmButtonLoading,
  defaultValues,
  onClose,
  onConfirm,
}: Props) {
  const routeTypeArr = ['msg', 'time'];
  const routeVal = routeTypeArr[(defaultValues?.type ?? 1) - 1];
  const [routeType, setRouteType] = useState(routeVal);
  const typeIndex = routeTypeArr.indexOf(routeType) + 1;

  const { templates } = useTemplatesQuery({ enabled: routeType === 'time' });
  const templateOptions = templates.map((val: TemplateItem) => {
    return { value: val.id, label: val.properties.basicInfo.name };
  });

  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    reset,
    control,
  } = useForm<FormValues>({
    defaultValues,
  });

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const template = templateOptions.filter(
        (i) => i.value === getValues().deviceTemplate
      );
      const condition = template.length > 0 && routeType === 'time';
      const formValues = {
        ...getValues(),
        deviceTemplateId: condition ? template[0]?.value : '',
        deviceTemplateName: condition ? template[0]?.label : '',
        type: typeIndex,
      };
      onConfirm(formValues);
      reset();
    }
  };

  const attribute = {
    size: '24px',
    style: { marginRight: '10px' },
  };

  const activeAttribute = {
    twoToneColor: 'green.100',
    color: 'primary',
  };

  const options = [
    {
      keyOpt: 'msg',
      titleOpt: '消息路由',
      iconOpt: RoutesMsgIcon,
    },
    {
      keyOpt: 'time',
      titleOpt: '时序路由',
      iconOpt: RoutesTimeIcon,
    },
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'routes',
    defaultValue: routeVal,
    onChange: (val) => {
      setRouteType(val);
    },
  });

  const group = getRootProps();
  return (
    <Modal
      title={title}
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={() => {
        reset();
        onClose();
      }}
      onConfirm={handleConfirm}
    >
      <TextField
        id="name"
        label="规则名称"
        placeholder="请输入"
        error={errors.name}
        registerReturn={register('name', {
          required: { value: true, message: '规则名称为空' },
        })}
      />
      <FormControl label="路由类型" id="form-routes">
        <HStack {...group}>
          {options.map((item) => {
            const { keyOpt, titleOpt, iconOpt: CustomIcon } = item;
            const radio = getRadioProps({
              value: keyOpt,
            });
            return (
              <RadioCard
                isDisabled={buttonType === 'editButton'}
                {...radio}
                key={keyOpt}
                label={titleOpt}
                icon={
                  <CustomIcon
                    {...attribute}
                    {...(radio.isChecked ? activeAttribute : {})}
                  />
                }
              />
            );
          })}
        </HStack>
      </FormControl>
      <Tip
        title="数据传输第二层为时序路由，传输模板约束后的结构化数据"
        styles={{ wrapper: { mb: '20px' } }}
      />
      {routeType === 'time' && (
        <SelectField<FormValues>
          id="deviceTemplate"
          name="deviceTemplate"
          label="使用设备模板"
          disabled={buttonType === 'editButton'}
          defaultValue={defaultValues?.deviceTemplateId}
          options={templateOptions}
          control={control}
          error={errors.deviceTemplate}
          rules={{
            required: { value: true, message: '设备模版为空' },
          }}
        />
      )}
      <TextareaField
        id="desc"
        label="描述"
        placeholder="请输入"
        error={errors.desc}
        registerReturn={register('desc')}
      />
    </Modal>
  );
}
