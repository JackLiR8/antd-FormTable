import { render, screen } from '@testing-library/react'
import { Form } from 'antd'
import type { FormTableColumn } from '../index'
import FormTable from '../index'

const columns: FormTableColumn[] = [
  {
    fieldType: 'input',
    dataIndex: 'name',
    title: 'Name',
    width: 100,
    fieldProps: {
      placeholder: 'your name',
    },
  },
  {

    fieldType: 'inputNumber',
    dataIndex: 'age',
    title: 'Age',
    width: 100,
  },
  {
    fieldType: 'select',
    dataIndex: 'gender',
    title: 'Gender',
    width: 100,
    fieldProps: {
      options: [
        { label: 'male', value: 1 },
        { label: 'female', value: 2 },
        { label: 'secret', value: 0 },
      ],
    },
  },
  {
    fieldType: 'input',
    dataIndex: 'address',
    title: 'Address',
    width: 100,
  },
]

describe('formTable', () => {
  it('should render the component', async () => {
    const [form] = Form.useForm()
    render(
      <Form
        form={form}
        initialValues={{
          users: [
            { name: 'jack', age: 20, gender: 1, address: 'street 1' },
            { name: 'curry', age: 12, gender: 1 },
            { name: 'lucy', age: 18, gender: 2, address: 'street 2' },
          ],
        }}
      >
        <FormTable name="users" columns={columns} form={form} />
      </Form>,
    )

    expect(screen.queryAllByPlaceholderText('your name')).toHaveLength(3)
  })
})
