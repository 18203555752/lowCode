
import { Form, Input, Menu, MenuProps, Select, Tabs } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { getStyle } from './style/tabStyle';
import l from "./index.less"
import { useContext, useState } from 'react';
import { getAttr } from './style/attr';
import { curComponentConText } from '@/contexts/componentList';
// console.log(l)




const onChange = (key: string) => {
  console.log(key);
};

export const RightProperty = () => {
  const { curComponent, dispatch } = useContext(curComponentConText)

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `样式`,

      children: getStyle(),
    },
    {
      key: '2',
      label: `属性`,
      children: getAttr(curComponent,dispatch ),
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