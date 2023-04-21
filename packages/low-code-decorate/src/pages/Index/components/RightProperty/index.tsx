
import { Form, Input, Select, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { Component, StyleItem } from "@/clazz/style"
const { Option } = Select;
const compoent = new Component()
compoent.buildStyle()
console.log(compoent)

const getItem = (item: StyleItem) => {
  switch (item.type) {
    case 'number':
      return <Form.Item
        label={item.name}
        name={item.style}
      >
        <Input />
      </Form.Item>
    case 'select':
      return <Form.Item
        label={item.name}
        name={item.style}
      >
        <Select
          placeholder="Select a option and change input text above"

          allowClear
        >
          {item.list?.map(_ => <Option value={_.val}>{_.name}</Option>)}

        </Select>
      </Form.Item>
    case 'color':
      return <Form.Item
        label={item.name}
        name={item.style}
      >
        <Input />
      </Form.Item>
      break
  }

}

const getinitaValues = () => {
  const obj: any = {}
  //  return  compoent.pos.map(item => ({[item.style]:item.val}))
  compoent.pos.forEach(item => {
    obj[item.style] = item.val
  })
  return obj
}


const getStyle = () => {
  console.log(getinitaValues())

  return <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={getinitaValues()}
    autoComplete="off"
  >
    {compoent.pos.map(item => getItem(item))}

  </Form>;
}



const items: TabsProps['items'] = [
  {
    key: '1',
    label: `样式`,
    children: getStyle(),
  },
  {
    key: '2',
    label: `Tab 2`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: '3',
    label: `Tab 3`,
    children: `Content of Tab Pane 3`,
  },
];

const onChange = (key: string) => {
  console.log(key);
};

export const RightProperty = () => {
  return <div><Tabs defaultActiveKey="1" items={items} onChange={onChange}></Tabs></div>
}