
import { Form, Input, Menu, MenuProps, Select, Tabs } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { getStyle } from './style/tabStyle';
import l from "./index.less"
import { useContext, useMemo, useState } from 'react';
import { getAttr } from './style/attr';
import { basicStoreConText, } from '@/contexts/componentList';
// console.log(l)




const onChange = (key: string) => {
  console.log(key);
};

export const RightProperty = () => {
  const { basicStore, dispatch } = useContext(basicStoreConText)
  const curComponent = useMemo(() => {
    if (basicStore.index)
      return basicStore.componentData.find(item => item.instance?.id === basicStore.index) || null
    return null
  }, [basicStore])

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `样式`,

      children: getStyle(),
    },
    {
      key: '2',
      label: `属性`,
      children: getAttr(curComponent,),
    },
    {
      key: '3',
      label: `Tab 3`,
      children: `Content of Tab Pane 3`,
    },
  ];

  return <div>
    {
      curComponent ? <Tabs className='custom-tab' defaultActiveKey="1" items={items} onChange={onChange}></Tabs> : null

    }
  </div>
}