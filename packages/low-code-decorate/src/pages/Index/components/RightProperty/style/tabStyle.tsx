
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
import { ComponentObj } from "@/types/basicStore";
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



const GetPos = (props: any) => {
  const [form] = Form.useForm();
  // const { curComponent, dispatch } = useContext(curComponentConText)
  const { basicStore, dispatch } = useContext(basicStoreConText)
  const curComponent = props.curComponent as ComponentObj | null;
  const onPosChange = (a: any) => {
    dispatch({ type: "changeCurComponentStyle", payload: { style: { ...a }, type: 'pos' } })

  }
  useEffect(() => {
    if (curComponent && curComponent.instance?.style) {
      const o: any = {}
      curComponent.instance.style.pos.forEach(item => {
        o[item.style] = item.val
      })
      form.setFieldsValue(o)
    }
  }, [basicStore])
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
export const GetfontSet = (props: any) => {
  const { basicStore, dispatch } = useContext(basicStoreConText)
  const curComponent = props.curComponent as ComponentObj | null;
  const [form] = Form.useForm();
  const onFontChange = (a: any) => {
    console.log(JSON.stringify(curComponent?.instance?.style.values))
    dispatch({ type: "changeCurComponentStyle", payload: { style: { ...a }, type: 'font' } })

  }
  useEffect(() => {
    if (curComponent && curComponent.instance?.style) {
      const o: any = {}
      curComponent.instance.style.fonts.forEach(item => {
        o[item.style] = item.val
      })
      form.setFieldsValue(o)
    }
  }, [basicStore])
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



export const getStyle = (curComponent: ComponentObj | null) => {


  return <Collapse className="style-collapse" defaultActiveKey={['1', '2']} onChange={onChange}>
    {curComponent?.instance?.style.pos.length ? <Panel header="位置" key="1">
      <GetPos curComponent={curComponent}></GetPos>

      {/* {GetPos()} */}
    </Panel> : null
    }

{curComponent?.instance?.style.fonts.length ?<Panel header="字体" key="2">
      <GetfontSet curComponent={curComponent}></GetfontSet>

      {/* {getfontSet()} */}
    </Panel>:null}
  </Collapse>

}