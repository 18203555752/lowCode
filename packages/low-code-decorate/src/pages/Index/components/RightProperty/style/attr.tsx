import { ComponentInfo, Attr } from "@/clazz/style";
import { StyleItem, StyleItemType } from "@/clazz/type";
import { curComponentConText } from "@/contexts/componentList";
import { ComponentObj } from "@/types/basicStore";
import { Collapse, Form, Input, InputNumber, Select } from "antd";
import { useContext, useEffect } from "react";
import { getFormItem } from "../item/items";

const { Panel } = Collapse;


const getinitaBasicValues = (o:any) => {
  const obj: any = {}
  Object.values(o || {}).forEach((item:any) => {
    obj[item.style] = item.val
  })
  return obj
}
/**
 *基础属性组件
 * @returns 
 */
const GetBasicAttr = () => {
  const { curComponent, dispatch } = useContext(curComponentConText)
  const [form] = Form.useForm();
  const onChangeBasic = (a: any) => {
    dispatch({ type: "changeCurComponentAttr", payload: { type: "_basicAttr", ...a } })
  }
  useEffect(() => {
    if (curComponent && curComponent.instance?.attr) {
      const o = getinitaBasicValues(curComponent.instance.attr)
      form.setFieldsValue(o)
    }
  }, [curComponent])
  return (
    <Form
      name="basicAttr"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onValuesChange={onChangeBasic}
      initialValues={getinitaBasicValues(curComponent?.instance?.attr.basicAttr)}
      autoComplete="off"
    >
      {Object.values(curComponent?.instance?.attr?.basicAttr || {}).map(item => getFormItem(item))}

    </Form>);
}
const onChange = (key: string | string[]) => {
  // console.log(key);
};
/**
 *基础属性组件
 * @returns 
 */
const GetPublicAttr = () => {
  const { curComponent, dispatch } = useContext(curComponentConText)
  const [form] = Form.useForm();
  const onChangeBasic = (a: any) => {
    dispatch({ type: "changeCurComponentAttr", payload: { type: "_publicAttr", ...a } })
  }
  useEffect(() => {
    if (curComponent && curComponent.instance?.attr) {
      const o = getinitaBasicValues(curComponent.instance.attr)
      form.setFieldsValue(o)
    }
  }, [curComponent])
  return (
    <Form
      name="publicAttr"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onValuesChange={onChangeBasic}
      initialValues={getinitaBasicValues(curComponent?.instance?.attr.publicAttr)}
      autoComplete="off"
    >
      {Object.values(curComponent?.instance?.attr?.publicAttr || {}).map(item => getFormItem(item))}

    </Form>);
}


export const getAttr = (curComponent: ComponentObj | null, dispatch: Function) => {

  return (<>
    {curComponent ? <Collapse className="style-collapse" defaultActiveKey={['1', '2']} onChange={onChange}>
      {
        curComponent.instance?.attr.hasPulicAttr ? < Panel header="公共属性" key="2" >
          <GetPublicAttr></GetPublicAttr>
        </Panel > : null
      }
      {
        curComponent.instance?.attr.hasBasicAttr ? < Panel header="基础属性" key="1" >
          <GetBasicAttr></GetBasicAttr>
        </Panel > : null
      }


    </Collapse > : null}
  </>)


}