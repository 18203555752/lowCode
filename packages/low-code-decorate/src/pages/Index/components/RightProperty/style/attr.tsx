import { ComponentInfo, Attr } from "@/clazz/style";
import { StyleItem, StyleItemType } from "@/clazz/type";
import { curComponentConText } from "@/contexts/componentList";
import { ComponentObj } from "@/types/basicStore";
import { Collapse, Form, Input, InputNumber, Select } from "antd";
import { useContext, useEffect } from "react";
import { getFormItem } from "../item/items";

const { Panel } = Collapse;


const getinitaBasicValues = (o: any) => {
  const obj: any = {}
  Object.values(o || {}).forEach((item: any) => {
    obj[item.style] = item.val
  })
  return obj
}
/**
 *基础属性组件
 * @returns 
 */
const GetBasicAttr = (props: any) => {

  const { curComponent, dispatch } = useContext(curComponentConText)
  const [form] = Form.useForm();
  const { type, } = props;

  const onChangeBasic = (a: any) => {
    dispatch({ type: "changeCurComponentAttr", payload: { type: type, ...a } })
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
      // labelCol={{ span: 9 }}
      // wrapperCol={{ span: 15 }}
      style={{ maxWidth: 600 }}
      onValuesChange={onChangeBasic}
      initialValues={getinitaBasicValues(curComponent?.instance?.attr.getAttr(type))}
      autoComplete="off"
    >
      {Object.values(curComponent?.instance?.attr?.getAttr(type) || {}).map((item,i) => getFormItem(item,i))}

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
      initialValues={getinitaBasicValues(curComponent?.instance?.attr.getAttr("_publicAttr"))}
      autoComplete="off"
    >
      {Object.values(curComponent?.instance?.attr?.getAttr("_publicAttr") || {}).map(item => getFormItem(item))}

    </Form>);
}


export const getAttr = (curComponent: ComponentObj | null, dispatch: Function) => {


  // console.log(curComponent?.instance?.attr.attrs)
  return (<>
    {curComponent ? <Collapse className="style-collapse" defaultActiveKey={['1', '2']} onChange={onChange}>
      {
        curComponent.instance?.attr.hasAttr("_publicAttr") ? < Panel header="公共属性" key="2" >
          <GetBasicAttr type={"_publicAttr"}></GetBasicAttr>
        </Panel > : null
      }
      {
        curComponent.instance?.attr.hasAttr("_basicAttr") ? < Panel header="基础属性" key="1" >
          <GetBasicAttr type={"_basicAttr"}></GetBasicAttr>
        </Panel > : null
      }
      {
        curComponent.instance?.attr.hasAttr("_dataAttr") ? < Panel header="数据配置" key="3" >
          <GetBasicAttr type={"_dataAttr"}></GetBasicAttr>
        </Panel > : null
      }
      {
        curComponent.instance?.attr.hasAttr("_labelAttr") ? < Panel header="标签配置" key="4" >
          <GetBasicAttr type={"_labelAttr"}></GetBasicAttr>
        </Panel > : null
      }
          {
        curComponent.instance?.attr.hasAttr("_axisAttr") ? < Panel header="轴配置" key="5" >
          <GetBasicAttr type={"_axisAttr"}></GetBasicAttr>
        </Panel > : null
      }



    </Collapse > : null}
  </>)


}