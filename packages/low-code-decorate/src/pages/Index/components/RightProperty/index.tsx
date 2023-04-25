
import { Form, Input, Menu, MenuProps, Select, Tabs } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { getStyle } from './style/tabStyle';
import l from  "./index.less"
import { useState } from 'react';
//@ts-ignore
import { SketchPicker } from 'react-color'
import { getAttr } from './style/attr';
// console.log(l)



const items: TabsProps['items'] = [
  {
    key: '1',
    label: `样式`,
    
    children: getStyle(),
  },
  {
    key: '2',
    label: `属性`,
    children: getAttr(),
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


  return <div>
    <Tabs className='custom-tab' defaultActiveKey="1" items={items} onChange={onChange}></Tabs>
    </div>
}