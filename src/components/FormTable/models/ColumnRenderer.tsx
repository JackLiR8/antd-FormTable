import type { FormRule } from 'antd'
import { Button, Form, Input, InputNumber, Select, Space } from 'antd'
import type { ReactNode } from 'react'
import type { NamePath } from 'antd/es/form/interface'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { FIELD_TYPES } from '../constants'

// factory method
export function createColumnRenderer(type: string, options?: {
  rowInitialValues?: any
}) {
  switch (type) {
    case FIELD_TYPES.text:
      return new TextColumnRenderer()
    case FIELD_TYPES.input:
      return new InputColumnRenderer()
    case FIELD_TYPES.inputNumber:
      return new InputNumberColumnRenderer()
    case FIELD_TYPES.select:
      return new SelectColumnRenderer()
    case FIELD_TYPES.operation:
      return new OperationColumnRenderer(options?.rowInitialValues)
    default:
      throw new Error('Invalid type')
  }
}

interface RenderArgs {
  name: NamePath
  rules: FormRule[] | undefined
  fieldsProps: any
}
type RenderFieldArgs = Pick<RenderArgs, 'fieldsProps'>

export abstract class ColumnRenderer {
  abstract type: string

  render({ name, rules, fieldsProps }: RenderArgs): ReactNode {
    if (this.type === FIELD_TYPES.text) {
      return this.renderField({
        fieldsProps,
      })
    }

    return (
      <Form.Item name={name} rules={rules}>
        {this.renderField({
          fieldsProps,
        })}
      </Form.Item>
    )
  }

  abstract renderField(args: RenderFieldArgs): ReactNode
}

export class TextColumnRenderer extends ColumnRenderer {
  type = FIELD_TYPES.text

  renderField() {
    return <div>hello</div> // FIXME
  }
}

// input
export class InputColumnRenderer extends ColumnRenderer {
  type = FIELD_TYPES.input

  renderField({ fieldsProps }: RenderFieldArgs) {
    return (
      <Input {...fieldsProps} />
    )
  }
}

// inputNumber
export class InputNumberColumnRenderer extends ColumnRenderer {
  type = FIELD_TYPES.inputNumber

  renderField({ fieldsProps }: RenderFieldArgs) {
    return (
      <InputNumber {...fieldsProps} />
    )
  }
}

// select
export class SelectColumnRenderer extends ColumnRenderer {
  type = FIELD_TYPES.select

  renderField({ fieldsProps }: RenderFieldArgs) {
    return (
      <Select {...fieldsProps} />
    )
  }
}

export class OperationColumnRenderer extends ColumnRenderer {
  type = FIELD_TYPES.operation
  rowInitialValues: any

  constructor(rowInitialValues: any) {
    super()
    this.rowInitialValues = rowInitialValues
  }

  renderField({ fieldsProps }: RenderFieldArgs) {
    const { addButton, removeButton, disabled } = fieldsProps
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
                  // TODO
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
                // TODO
                }}
                disabled={disabled}
              />
            )
        }
      </Space>
    )
  }
}
