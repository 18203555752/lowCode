
import { Form, Input, Menu, MenuProps, Select, Tabs } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { getStyle } from './style/tabStyle';
import l from  "./index.less"
import { useState } from 'react';
// console.log(l)



const items: TabsProps['items'] = [
  {
    key: '1',
    label: `样式`,
    
    children: getStyle(),
  },
  {
    key: '2',
    label: `Tab 2`,
    children: `Content of Tab Pane 2`,
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
  // useState()
  return <div>
    <Tabs className='custom-tab' defaultActiveKey="1" items={items} onChange={onChange}></Tabs>
    </div>
}