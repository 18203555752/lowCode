
import { Form, Input, Select, Collapse } from "antd"
//@ts-ignore
import { SketchPicker } from 'react-color'
import "../index.less"
import { ComponentInfo } from "@/clazz/style";
import { StyleItem, StyleItemType } from "@/clazz/type";
import { useState } from "react";
const { Option } = Select;
const { Panel } = Collapse;
const compoent = new ComponentInfo()
const style = compoent.style
style.buildStyle(["width", "height"], ["fontSize", "fontWeight", "color"])
console.log(compoent)
console.log(style.allStyles)



const getinitaPosValues = () => {
  const obj: any = {}
  style.pos.forEach(item => {
    obj[item.style] = item.val
  })
  return obj
}

const getinitaFontValues = () => {
  const obj: any = {}
  style.fonts.forEach(item => {
    obj[item.style] = item.val
  })
  return obj
}


const GetFormItem = (item: StyleItem, fn?: Function, color?: string) => {
  switch (item.type) {
    case StyleItemType.Number:
      return <Form.Item
        key={item.style}
        label={item.name}
        name={item.style}
      >
        <Input addonAfter="px" />
      </Form.Item>
    case StyleItemType.Select:
      return <Form.Item
        key={item.style}
        label={item.name}
        name={item.style}
      >
        <Select
          placeholder="请选择字体"
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
        <div className="color-bg" style={{ width: "100%", height: "20px" }}>
          <span style={{ background: color, display: "block", height: "90%", width: "100%" }}></span>
          <SketchPicker className="color-panel" color={color} onChange={fn} />

        </div>
      </Form.Item>
  }

}

const onChange = (key: string | string[]) => {
  // console.log(key);
};
const onFontChange = (a: any) => {
  const key = Object.keys(a)[0]
  style.setFont(key, a[key])
  console.log(a)
}
const onPosChange = (a: any) => {
  const key = Object.keys(a)[0]
  style.setPos(key, a[key])
  console.log(a)
}

const GetPos = () => {
  return (
    <Form
      name="pos"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onValuesChange={onPosChange}
      initialValues={getinitaPosValues()}
      autoComplete="off"
    >
      {style.pos.map(item => GetFormItem(item))}

    </Form>);
}
export const GetfontSet = () => {
  const obj = getinitaFontValues()

  const [color, setColor] = useState(obj.color || "#aaa")
  const onchange = (a: any) => {
    setColor(a.hex)
    console.log(color)

  }
  return (<Form
    name="font"
    onValuesChange={onFontChange}
    labelCol={{ span: 9 }}
    wrapperCol={{ span: 15 }}
    style={{ maxWidth: 600 }}
    initialValues={getinitaFontValues()}
    autoComplete="off"
  >
    {style.fonts.map(item => GetFormItem(item, onchange, color))}

  </Form>);
}



export const getStyle = () => {
  // useState("")
  return <Collapse className="style-collapse" defaultActiveKey={['1', '2']} onChange={onChange}>

    <Panel header="位置" key="1">
      <GetPos></GetPos>

      {/* {GetPos()} */}
    </Panel>

    <Panel header="字体" key="2">
      <GetfontSet></GetfontSet>

      {/* {getfontSet()} */}
    </Panel>
  </Collapse>

}