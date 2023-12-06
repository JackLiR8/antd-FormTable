import type { AutoCompleteProps, CascaderProps, CheckboxProps, DatePickerProps, FormInstance, FormListFieldData, FormListOperation, FormRule, InputNumberProps, InputProps, RateProps, SelectProps, SwitchProps, TableColumnType, TableProps, TimePickerProps, TreeSelectProps, UploadProps } from 'antd'
import type { ReactNode } from 'react'
import type { NamePath } from 'antd/es/form/interface'
import type { FIELD_TYPES } from '../constants'
import type { ValuesOf } from './utils'

export type FieldTypes = ValuesOf<typeof FIELD_TYPES>
export type FormTableProps<R = any> = {
  name: NamePath
  parentName?: NamePath
  form?: FormInstance
  columns: FormTableColumn<R>[]
  initialValue?: any[]
  max?: number
  min?: number
  empty?: ReactNode
  disabled?: boolean
} & Omit<TableProps<R>, 'render' | 'columns'>

// eslint-disable-next-line ts/consistent-type-definitions
export type FormTableRecordField = {
  field: FormListFieldData
  operation: FormListOperation
}

export type FormTableColumn<R = any> = {
  title: ReactNode
  dataIndex: string
  initialValue?: unknown
  rules?: FormRule[] | ((record: R, index: number) => FormRule[])
  render?: (value: any, record: R, index: number, recordField: FormTableRecordField) => ReactNode
} & (
  // | { fieldType: typeof FIELD_TYPES.index, fieldProps?: never }
  | { fieldType: typeof FIELD_TYPES.text, fieldProps?: never }
  | { fieldType: typeof FIELD_TYPES.input, fieldProps?: InputProps }
  | { fieldType: typeof FIELD_TYPES.select, fieldProps?: SelectProps }
  | { fieldType: typeof FIELD_TYPES.inputNumber, fieldProps?: InputNumberProps }
  | { fieldType: typeof FIELD_TYPES.datePicker, fieldProps?: DatePickerProps }
  | { fieldType: typeof FIELD_TYPES.switch, fieldProps?: SwitchProps }
  | { fieldType: typeof FIELD_TYPES.checkbox, fieldProps?: CheckboxProps }
  | { fieldType: typeof FIELD_TYPES.autoComplete, fieldProps?: AutoCompleteProps }
  | { fieldType: typeof FIELD_TYPES.cascader, fieldProps?: CascaderProps }
  | { fieldType: typeof FIELD_TYPES.timePicker, fieldProps?: TimePickerProps }
  | { fieldType: typeof FIELD_TYPES.treeSelect, fieldProps?: TreeSelectProps }
  | { fieldType: typeof FIELD_TYPES.upload, fieldProps?: UploadProps }
  | { fieldType: typeof FIELD_TYPES.rate, fieldProps?: RateProps }
  | {
    fieldType: typeof FIELD_TYPES.operation
    fieldProps?: {
      disabled?: boolean
      addButton?: ReactNode
      removeButton?: ReactNode
    }
  }
  | { fieldType?: never, fieldProps?: never, addButton?: never, removeButton?: never }
) & Omit<TableColumnType<R>, 'render' | 'dataIndex'>
