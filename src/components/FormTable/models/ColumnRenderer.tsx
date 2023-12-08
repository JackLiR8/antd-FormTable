import type { AutoCompleteProps, CascaderProps, CheckboxProps, DatePickerProps, InputNumberProps, InputProps, RateProps, SelectProps, SwitchProps, TimePickerProps, TreeSelectProps, UploadProps } from 'antd'
import { AutoComplete, Button, Cascader, Checkbox, DatePicker, Form, Input, InputNumber, Rate, Select, Space, Switch, TimePicker, TreeSelect, Upload } from 'antd'
import type { ReactNode } from 'react'
import type { NamePath } from 'antd/es/form/interface'
import { MinusOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import type { FormItemProps, Rule } from 'antd/es/form'
import { FIELD_TYPES } from '../constants'
import type {
  FieldTypes,
  FormTableColumn,
  FormTableRecordField,
  OperationFieldProps,
  TextFieldProps,
} from '..'
import { compositeNamePath } from '../utils'

type NormalizedColumn = Omit<FormTableColumn, 'rules'> & {
  rules?: Rule[]
}

export interface ColumnRendererContext {
  column: NormalizedColumn
  rowIndex: number
  rowInitialValues?: any
  tableNamePath: NamePath
  recordField: FormTableRecordField
}

// factory method
export function createColumnRenderer(type: string, context: ColumnRendererContext) {
  switch (type) {
    case FIELD_TYPES.text:
      return new TextColumnRenderer(context)
    case FIELD_TYPES.input:
      return new InputColumnRenderer(context)
    case FIELD_TYPES.inputNumber:
      return new InputNumberColumnRenderer(context)
    case FIELD_TYPES.select:
      return new SelectColumnRenderer(context)
    case FIELD_TYPES.datePicker:
      return new DatePickerColumnRenderer(context)
    case FIELD_TYPES.timePicker:
      return new TimePickerColumnRenderer(context)
    case FIELD_TYPES.switch:
      return new SwitchColumnRenderer(context)
    case FIELD_TYPES.checkbox:
      return new CheckboxColumnRenderer(context)
    case FIELD_TYPES.autoComplete:
      return new AutoCompleteColumnRenderer(context)
    case FIELD_TYPES.cascader:
      return new CascaderColumnRenderer(context)
    case FIELD_TYPES.treeSelect:
      return new TreeSelectColumnRenderer(context)
    case FIELD_TYPES.upload:
      return new UploadColumnRenderer(context)
    case FIELD_TYPES.rate:
      return new RateColumnRenderer(context)
    case FIELD_TYPES.operation:
      return new OperationColumnRenderer(context)
    default:
      throw new Error('Invalid type')
  }
}

export abstract class ColumnRenderer<FieldProps> {
  abstract type: FieldTypes
  renderContext: ColumnRendererContext
  formItemProps?: FormItemProps

  constructor(renderContext: ColumnRendererContext) {
    this.renderContext = renderContext
  }

  get column() {
    return this.renderContext.column
  }

  get fieldProps(): FieldProps {
    return this.column.fieldProps as FieldProps
  }

  get fieldNameInFormList() {
    return [this.renderContext.rowIndex, this.column.dataIndex]
  }

  render(): ReactNode {
    const column = this.column

    if (this.type === FIELD_TYPES.text)
      return this.renderField()

    return (
      <Form.Item {...this.formItemProps} name={this.fieldNameInFormList} rules={column.rules}>
        {this.renderField()}
      </Form.Item>
    )
  }

  abstract renderField(): ReactNode
}

export class TextColumnRenderer extends ColumnRenderer<TextFieldProps> {
  type = FIELD_TYPES.text

  renderField() {
    const { ellipsis } = this.fieldProps
    return (
      <Form.Item shouldUpdate>
        {(form) => {
          const namePath = compositeNamePath(
            this.renderContext.tableNamePath,
            this.fieldNameInFormList,
          )
          const value = form.getFieldValue(namePath)

          return (
            <div
              className={ellipsis ? 'text-ellipsis' : ''}
              title={value}
            >
              {value}
            </div>
          )
        }}
      </Form.Item>
    )
  }
}

// input
export class InputColumnRenderer extends ColumnRenderer<InputProps> {
  type = FIELD_TYPES.input

  renderField() {
    return (
      <Input {...this.fieldProps} />
    )
  }
}

// inputNumber
export class InputNumberColumnRenderer extends ColumnRenderer<InputNumberProps> {
  type = FIELD_TYPES.inputNumber

  renderField() {
    return (
      <InputNumber {...this.fieldProps} />
    )
  }
}

export class SelectColumnRenderer extends ColumnRenderer<SelectProps> {
  type = FIELD_TYPES.select

  renderField() {
    return (
      <Select {...this.fieldProps} />
    )
  }
}

export class DatePickerColumnRenderer extends ColumnRenderer<DatePickerProps> {
  type = FIELD_TYPES.datePicker

  renderField() {
    return (
      <DatePicker {...this.fieldProps} />
    )
  }
}

export class TimePickerColumnRenderer extends ColumnRenderer<TimePickerProps> {
  type = FIELD_TYPES.timePicker

  renderField() {
    return (
      <TimePicker {...this.fieldProps} />
    )
  }
}

export class SwitchColumnRenderer extends ColumnRenderer<SwitchProps> {
  type = FIELD_TYPES.switch
  formItemProps = {
    valuePropName: 'checked',
  }

  renderField() {
    return (
      <Switch {...this.fieldProps} />
    )
  }
}

export class CheckboxColumnRenderer extends ColumnRenderer<CheckboxProps> {
  type = FIELD_TYPES.checkbox
  formItemProps = {
    valuePropName: 'checked',
  }

  renderField() {
    return (
      <Checkbox {...this.fieldProps} />
    )
  }
}

export class AutoCompleteColumnRenderer extends ColumnRenderer<AutoCompleteProps> {
  type = FIELD_TYPES.autoComplete

  renderField() {
    return (
      <AutoComplete {...this.fieldProps} />
    )
  }
}

export class CascaderColumnRenderer extends ColumnRenderer<CascaderProps> {
  type = FIELD_TYPES.cascader

  renderField() {
    return (
      <Cascader {...this.fieldProps} />
    )
  }
}

export class TreeSelectColumnRenderer extends ColumnRenderer<TreeSelectProps> {
  type = FIELD_TYPES.treeSelect

  renderField() {
    return (
      <TreeSelect {...this.fieldProps} />
    )
  }
}

export class UploadColumnRenderer extends ColumnRenderer<UploadProps> {
  type = FIELD_TYPES.upload
  formItemProps = {
    valuePropName: 'fileList',
    // getValueFromEvent: (e: any) => {
    //   if (Array.isArray(e)) return e
    //   return e && e.fileList
    // },
  }

  renderField() {
    return (
      <Upload {...this.fieldProps}>
        {this.fieldProps.children ?? <UploadOutlined style={{ fontSize: 20 }} />}
      </Upload>
    )
  }
}

export class RateColumnRenderer extends ColumnRenderer<RateProps> {
  type = FIELD_TYPES.rate

  renderField() {
    return (
      <Rate {...this.fieldProps} />
    )
  }
}

export class OperationColumnRenderer extends ColumnRenderer<OperationFieldProps> {
  type = FIELD_TYPES.operation

  renderField() {
    const { addButton, removeButton, disabled } = this.fieldProps
    const { rowIndex, rowInitialValues, recordField } = this.renderContext
    const { operation } = recordField

    return (
      <Space>
        {
          addButton === false
            ? null
            : addButton || (
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                size="small"
                onClick={() => {
                  operation.add(rowInitialValues, rowIndex + 1)
                }}
                disabled={disabled}
              />
            )
        }
        {
          removeButton === false
            ? null
            : removeButton || (
              <Button
                type="primary"
                shape="circle"
                danger
                icon={<MinusOutlined />}
                size="small"
                onClick={() => {
                  operation.remove(rowIndex)
                }}
                disabled={disabled}
              />
            )
        }
      </Space>
    )
  }
}
