import { Button, Form } from 'antd'
import './App.css'
import type { FormTableColumn } from './components/FormTable'
import FormTable from './components/FormTable'

function App() {
  const [form] = Form.useForm()

  const columns: FormTableColumn[] = [
    {
      fieldType: 'input',
      dataIndex: 'name',
      title: 'Name',
      fieldProps: {
        placeholder: 'your name',
      },
    },
    {

      fieldType: 'inputNumber',
      dataIndex: 'age',
      title: 'Age',
      fieldProps: {
        placeholder: 'your age',
      },
    },
    {
      fieldType: 'select',
      dataIndex: 'gender',
      title: 'Gender',
      fieldProps: (record, index) => ({
        placeholder: 'your gender',
        options: [
          { label: 'male', value: 1 },
          { label: 'female', value: 2 },
          { label: 'secret', value: 0 },
        ],
        onSelect: (value, option) => {
          form.setFieldValue(['users', index, 'genderText'], option.label)
        },
      }),
    },
    {
      title: 'gender',
      dataIndex: 'genderText',
    },
    {
      fieldType: 'datePicker',
      dataIndex: 'birthday',
      title: 'Birthday',
      fieldProps: {
        placeholder: 'your birthday',
      },
    },
    {
      fieldType: 'switch',
      dataIndex: 'isAdult',
      title: 'Is Adult',
      fieldProps: {
        checkedChildren: 'yes',
        unCheckedChildren: 'no',
      },
    },
    {
      fieldType: 'checkbox',
      dataIndex: 'isMarried',
      title: 'Is Married',
      fieldProps: {
        children: 'yes',
      },
    },
    {
      fieldType: 'autoComplete',
      dataIndex: 'email',
      title: 'Email',
    },
    {
      fieldType: 'cascader',
      dataIndex: 'address',
      title: 'Address',
    },
    {
      fieldType: 'treeSelect',
      dataIndex: 'province',
      title: 'Province',
    },
    {
      fieldType: 'upload',
      dataIndex: 'avatar',
      title: 'Avatar',
    },
    {
      fieldType: 'rate',
      dataIndex: 'rate',
      title: 'Rate',
    },
    {
      title: 'Operation',
      fieldType: 'operation',
      dataIndex: 'operation',
    },
  ]

  const handleSubmit = async () => {
    await form.validateFields()
  }

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          users: [
            { name: 'jack', age: undefined, gender: undefined, address: 'street 1' },
            { name: 'curry', age: undefined, gender: undefined },
            { name: 'lucy', age: undefined, gender: undefined, address: 'street 2' },
          ],
        }}
      >
        <Form.Item label="users">
          <FormTable
            name="users"
            columns={columns}
          />
        </Form.Item>
      </Form>

      <div>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  )
}

export default App
