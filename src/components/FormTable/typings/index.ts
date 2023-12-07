import type {
  AutoCompleteProps,
  CascaderProps,
  CheckboxProps,
  DatePickerProps,
  FormInstance,
  FormListFieldData,
  FormListOperation,
  FormRule,
  InputNumberProps,
  InputProps,
  RateProps,
  SelectProps,
  SwitchProps,
  TableColumnType,
  TableProps,
  TimePickerProps,
  TreeSelectProps,
  UploadProps,
} from 'antd'
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

type FieldProps<T> =
  | T
  | ((record: any, index: number, recordField: FormTableRecordField) => T)

export type FormTableColumn<R = any> = {
  title: ReactNode
  dataIndex: string
  initialValue?: unknown
  rules?: FormRule[] | ((record: R, index: number) => FormRule[])
  render?: (value: any, record: R, index: number, recordField: FormTableRecordField) => ReactNode
} & (
  // | { fieldType: typeof FIELD_TYPES.index, fieldProps?: never }
  | {
    fieldType: typeof FIELD_TYPES.input
    fieldProps?: FieldProps<InputProps>
  }
  | {
    fieldType: typeof FIELD_TYPES.select
    fieldProps?: FieldProps<SelectProps>
  }
  | {
    fieldType: typeof FIELD_TYPES.inputNumber
    fieldProps?: FieldProps<InputNumberProps>
  }
  | {
    fieldType: typeof FIELD_TYPES.datePicker
    fieldProps?: FieldProps<DatePickerProps>
  }
  | {
    fieldType: typeof FIELD_TYPES.switch
    fieldProps?: FieldProps<SwitchProps>
  }
  | {
    fieldType: typeof FIELD_TYPES.checkbox
    fieldProps?: FieldProps<CheckboxProps>
  }
  | {
    fieldType: typeof FIELD_TYPES.autoComplete
    fieldProps?: FieldProps<AutoCompleteProps
    >
  }
  | {
    fieldType: typeof FIELD_TYPES.cascader
    fieldProps?: FieldProps<CascaderProps>
  }
  | {
    fieldType: typeof FIELD_TYPES.timePicker
    fieldProps?: FieldProps<TimePickerProps>
  }
  | {
    fieldType: typeof FIELD_TYPES.treeSelect
    fieldProps?: FieldProps<TreeSelectProps>
  }
  | {
    fieldType: typeof FIELD_TYPES.upload
    fieldProps?: FieldProps<UploadProps>
  }
  | {
    fieldType: typeof FIELD_TYPES.rate
    fieldProps?: FieldProps<RateProps>
  }
  | {
    fieldType: typeof FIELD_TYPES.operation
    fieldProps?: FieldProps<OperationFieldProps>
  }
  | {
    fieldType: typeof FIELD_TYPES.text
    fieldProps?: FieldProps<TextFieldProps>
  }
  | {
    fieldType?: never
    fieldProps?: never
  }
) & Omit<TableColumnType<R>, 'render' | 'dataIndex'>

export interface TextFieldProps {
  disabled?: boolean
  ellipsis?: boolean
}

export interface OperationFieldProps {
  disabled?: boolean
  addButton?: ReactNode
  removeButton?: ReactNode
}
