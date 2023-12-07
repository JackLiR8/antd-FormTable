import type { InputNumberProps, InputProps, SelectProps } from 'antd'
import { Button, Form, Input, InputNumber, Select, Space } from 'antd'
import type { ReactNode } from 'react'
import type { NamePath } from 'antd/es/form/interface'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import type { Rule } from 'antd/es/form'
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
    case FIELD_TYPES.operation:
      return new OperationColumnRenderer(context)
    default:
      throw new Error('Invalid type')
  }
}

export abstract class ColumnRenderer<FieldProps> {
  abstract type: FieldTypes
  renderContext: ColumnRendererContext

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
      <Form.Item name={this.fieldNameInFormList} rules={column.rules}>
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
          const namePath = compositeNamePath(this.renderContext.tableNamePath, this.fieldNameInFormList)
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

// select
export class SelectColumnRenderer extends ColumnRenderer<SelectProps> {
  type = FIELD_TYPES.select

  renderField() {
    return (
      <Select {...this.fieldProps} />
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
