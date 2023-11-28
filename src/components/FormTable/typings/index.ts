import type { TableColumnType, TableProps } from 'antd';

export type FormTableProps<T> = Omit<TableProps<T>, 'render'> & {
  columns: FormTableColumn<T>[];
}

type FormTableColumn<T> = Omit<TableColumnType<T>, 'render'> & {
  type: 'input' | 'select' | 'date' | 'datetime' | 'time' | 'number' | 'switch' | 'radio' | 'checkbox' | 'textarea' | 'password' | 'custom';
}

