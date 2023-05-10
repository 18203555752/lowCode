
import { Form, Input, Select, Collapse, InputNumber } from "antd"
//@ts-ignore
import { SketchPicker } from 'react-color'
import "../index.less"
import { ComponentInfo, Style } from "@/clazz/style";
import { StyleItem, StyleItemType } from "@/clazz/type";
import { useContext, useEffect, useMemo, useState } from "react";
// import { curComponentConText } from "@/contexts/componentList";
import { Color } from "../item/Color";
import { getFormItem } from "../item/items";
import { basicStoreConText } from "@/contexts/componentList";
const { Option } = Select;
const { Panel } = Collapse;
// const compoent = new ComponentInfo()
// const style = compoent.style
// style.buildStyle(["width", "height"], ["fontSize", "fontWeight", "color"])
// console.log(compoent)
// console.log(style.allStyles)



const getinitaPosValues = (style: Style | null) => {
  const obj: any = {}
  if (style)
    style.pos.forEach(item => {
      obj[item.style] = item.val
    })
  return obj
}

const getinitaFontValues = (style: Style | null) => {
  const obj: any = {}
  if (style)
    style.fonts.forEach(item => {
      obj[item.style] = item.val
    })
  return obj
}



const onChange = (key: string | string[]) => {
  // console.log(key);
};



const GetPos = () => {
  const [form] = Form.useForm();
  // const { curComponent, dispatch } = useContext(curComponentConText)
  const { basicStore, dispatch } = useContext(basicStoreConText)
  const curComponent = useMemo(() => {
    if (basicStore.index)
      return basicStore.componentData[basicStore.index]
    return null
  }, [basicStore])
  const onPosChange = (a: any) => {
    dispatch({ type: "changeCurComponentStyle", payload: { ...a, type: 'pos' } })

  }
  useEffect(() => {
    if (curComponent && curComponent.instance?.style) {
      const o: any = {}
      curComponent.instance.style.pos.forEach(item => {
        o[item.style] = item.val
      })
      form.setFieldsValue(o)
    }
  }, [curComponent])
  return (<div>

    {curComponent ? <Form
      form={form}
      name="pos"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onValuesChange={onPosChange}
      initialValues={getinitaPosValues(curComponent?.instance?.style || null)}
      autoComplete="off"
    >
      {/* {curComponent.instance ? style.pos.map(item => GetFormItem(item))} */}
      {curComponent.instance?.style.pos.map(item => getFormItem(item))}

    </Form> : null}
  </div>
  );
}
export const GetfontSet = () => {
  const { basicStore, dispatch } = useContext(basicStoreConText)
  const curComponent = useMemo(() => {
    if (basicStore.index)
      return basicStore.componentData[basicStore.index]
    return null
  }, [basicStore])
  const [form] = Form.useForm();
  const onFontChange = (a: any) => {
    console.log(555)
    dispatch({ type: "changeCurComponentStyle", payload: { ...a, type: 'font' } })

  }
  useEffect(() => {
    if (curComponent && curComponent.instance?.style) {
      const o: any = {}
      curComponent.instance.style.fonts.forEach(item => {
        o[item.style] = item.val

      })
      form.setFieldsValue(o)
    }
  }, [curComponent])
  return (
    <div>
      {curComponent ? <Form
        form={form}
        name="font"
        onValuesChange={onFontChange}
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        style={{ maxWidth: 600 }}
        initialValues={getinitaFontValues(curComponent?.instance?.style || null)}
        autoComplete="off"
      >
        {curComponent.instance?.style.fonts.map(item => getFormItem(item))}
        {/* <Form.Item name={'abs'}>
          <Input ></Input>
        </Form.Item> */}

      </Form> : null}
    </div>
  );
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