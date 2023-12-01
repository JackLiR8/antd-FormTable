import type { AutoCompleteProps, CascaderProps, CheckboxProps, DatePickerProps, FormInstance, FormRule, InputNumberProps, InputProps, RateProps, SelectProps, SwitchProps, TableColumnType, TableProps, TimePickerProps, TreeSelectProps, UploadProps } from 'antd'
import type { NamePath } from 'antd/es/form/interface'
import type { ReactNode } from 'react'
import type { FIELD_TYPES } from '../constants'
import type { ValuesOf } from './utils'

export type FieldTypes = ValuesOf<typeof FIELD_TYPES>
export type FormTableProps<T = any> = Omit<TableProps<T>, 'render' | 'columns'> & {
  name: NamePath
  parentName?: NamePath
  form?: FormInstance
  columns: FormTableColumn<T>[]
  initialValue?: unknown
  max?: number
  min?: number
  empty?: ReactNode
  disabled?: boolean
}

export type FormTableColumn<T = any> = Omit<TableColumnType<T>, 'render'> & {
  title: ReactNode
  dataIndex?: string
  initialValue?: unknown
  rules?: FormRule[] | ((record: T, index: number) => FormRule[])
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
      hideAddButton?: boolean
      hideRemoveButton?: boolean
    }
  }
  | { fieldType?: never, fieldProps?: never, hideAddButton?: never, hideRemoveButton?: never }
)
