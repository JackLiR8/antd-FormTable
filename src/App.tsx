import { Button, Form } from 'antd'
import './App.css'
import type { FormTableColumn } from './components/FormTable'
import FormTable from './components/FormTable'

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
    fieldProps: {
      placeholder: 'your gender',
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
    fieldProps: {
      placeholder: 'your address',
    },
  },
  {
    title: 'Operation',
    fieldType: 'operation',
    dataIndex: 'operation',
  },
]

function App() {
  const [form] = Form.useForm()
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
