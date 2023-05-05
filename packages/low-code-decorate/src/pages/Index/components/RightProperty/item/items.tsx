import { StyleItem, StyleItemType } from "@/clazz/type"
import { Form, Input, InputNumber, Select, Switch } from "antd"
import { Color } from "./Color";
const { Option } = Select;

export const getFormItem = (item: StyleItem, i = 0) => {

  switch (item.type) {
    case StyleItemType.Number:
      return <Form.Item
        key={item.style}
        label={item.name}
        name={item.style}
      >
        {item.unit ? <InputNumber addonAfter={item.unit} /> : <InputNumber style={{ width: "100%" }} />}


      </Form.Item>
    case StyleItemType.TXT:
      return <Form.Item
        key={item.style}
        label={item.name}
        name={item.style}
      >
        <Input readOnly={item.readonly} />
      </Form.Item>
    case StyleItemType.Switch:
      return <Form.Item
        key={item.style}
        label={item.name}
        name={item.style}
      >
        <Switch />

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
        style={{ position: "relative", "zIndex": 100 - i }}
      >
        <Color color={item.val as string}></Color>

      </Form.Item>

  }

}