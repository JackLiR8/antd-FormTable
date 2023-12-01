import { Form, Input } from 'antd'
import type { FormTableProps } from './typings'

export * from './typings'

export default function FormTable(props: FormTableProps) {
  const { name, form } = props
  const tableData = Form.useWatch(name, form)
  return (
    <div>

      {
        tableData?.map((item: any, index: any) => {
          return (
            <div key={index}>
              <Input placeholder="your name" />
            </div>
          )
        })
      }
    </div>
  )
}
