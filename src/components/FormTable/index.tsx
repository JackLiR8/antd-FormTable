import type { FormListFieldData, FormListOperation } from 'antd'
import { Form } from 'antd'
import type { ColumnType, ColumnsType } from 'antd/es/table'
import Table from 'antd/es/table'
import type { AnyObject } from 'antd/es/_util/type'
import type { FormTableColumn, FormTableProps } from './typings'
import { FIELD_TYPES } from './constants'
import { createColumnRenderer } from './models/ColumnRenderer'
import './style/index.css'
import { compositeNamePath } from './utils'

export * from './typings'

export default function FormTable<R extends AnyObject = AnyObject>(props: FormTableProps<R>) {
  const { name, parentName, form, columns, initialValue, disabled } = props

  const tableData = Form.useWatch(name, form)

  const normalizeColumns = (columns: FormTableColumn[], formListFields: {
    fields: FormListFieldData[]
    operation: FormListOperation
  }): ColumnsType<R> => {
    const rowInitialValues = columns.reduce((acc, column) => {
      const { dataIndex, initialValue } = column
      if (initialValue)
        acc[dataIndex] = initialValue

      return acc
    }, {} as Record<string, any>)

    return columns.map((column) => {
      const {
        rules,
        render,
        fieldType = FIELD_TYPES.text,
        fieldProps = {},
        ...columnPropsRest
      } = column

      const innerRender: ColumnType<R>['render'] = (text, record, index) => {
        const normalizedRules = typeof rules === 'function' ? rules(record, index) : rules

        const recordField = {
          field: formListFields.fields[index],
          operation: formListFields.operation,
        }
        if (typeof render === 'function')
          return render(text, record, index, recordField)

        const normalizedFieldProps = typeof fieldProps === 'function'
          ? fieldProps(record, index, recordField)
          : fieldProps

        const columnRenderer = createColumnRenderer(
          fieldType,
          {
            rowInitialValues,
            recordField,
            rowIndex: index,
            tableNamePath: compositeNamePath(parentName, name),
            column: {
              ...column,
              rules: normalizedRules,
              fieldProps: {
                ...normalizedFieldProps,
                disabled: normalizedFieldProps?.disabled ?? disabled,
              },
            },
          },
        )

        return columnRenderer.render()
      }

      return {
        ...columnPropsRest,
        render: innerRender,
      }
    })
  }

  return (
    <div className="antd-formTable">
      <Form.List name={name} initialValue={initialValue}>
        {(fields, operation) => {
          const normalizedColumns = normalizeColumns(columns, {
            fields,
            operation,
          })
          return (
            <Table
              size="small"
              dataSource={tableData}
              columns={normalizedColumns}
              pagination={false}
              bordered
            />
          )
        }}
      </Form.List>
    </div>
  )
}
