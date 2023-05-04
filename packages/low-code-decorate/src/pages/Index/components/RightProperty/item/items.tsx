import { StyleItem, StyleItemType } from "@/clazz/type"
import { Form, Input, InputNumber, Select } from "antd"
import { Color } from "./Color";
const { Option } = Select;

export const getFormItem = (item: StyleItem, fn?: Function, color?: string) => {
  switch (item.type) {
    case StyleItemType.Number:
      return <Form.Item
        key={item.style}
        label={item.name}
        name={item.style}
      >
        <InputNumber addonAfter={item.unit}/>
      </Form.Item>
    case StyleItemType.TXT:
      return <Form.Item
        key={item.style}
        label={item.name}
        name={item.style}
      >
        <Input readOnly={item.readonly} />
      </Form.Item>
    case StyleItemType.Select:
      return <Form.Item
        key={item.style}
        label={item.name}
        name={item.style}
      >
        <Select
          placeholder=""
          allowClear
        >
          {item.list?.map((_, i) => <Option value={_.val} key={i}>{_.name}</Option>)}
        </Select>
      </Form.Item>

    case StyleItemType.Color:
      return <Form.Item
        key={item.style}
        label={item.name}
        name={item.style}
      >
        <Color color={item.val as string}></Color>

      </Form.Item>

  }

}