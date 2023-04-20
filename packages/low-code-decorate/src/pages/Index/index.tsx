// import { useState } from 'react';
import { Layout, Menu } from 'antd';
import PageHeader from '../../components/PageHeader';
import { LeftMenu } from './components/LeftMenu';
import { RightProperty } from './components/RightProperty';
import CenterCanvas  from './components/CenterCanvas';
import React, { Suspense, useState } from 'react';
import {componentList} from './loadComponents'
import {BasicStore} from '@/contexts/componentList'
import { ComponentObj } from '@/types/basicStore';
console.log(componentList)
const { Header, Content, Sider } = Layout;

export const Index = () => {
  const [componentData, setComponentData] = useState<ComponentObj[]>([])
  const [curComponent, setCurComponent] = useState<ComponentObj| null>(null)
  console.log(componentData)
  const handle = ()=> {
    setComponentData([componentList.StaticText])
  }
  return (
    <BasicStore.Provider value={{componentData, curComponent}}>
      <Layout style={{color: '#fff', height: '100vh'}}>
        <Header style={{background: 'rgb(33, 37, 40)'}}><PageHeader /></Header>
        <button onClick={handle}>添加</button>
        <Layout style={{height: 'calc(100% - 80px)'}}>
          <Sider collapsible width={200} style={{background: 'rgb(33, 37, 40)'}}>
            sider
          </Sider>
          <Content style={{background: 'rgb(39, 46, 59)'}}>
            <CenterCanvas name='画布区域'></CenterCanvas>
            {componentData.map((item)=> <Suspense key={item.componentName} fallback={<div>Loading...</div>}>
              <item.component ></item.component>
            </Suspense>)}
          </Content>
          <Sider width={200} style={{background: 'rgb(33, 37, 40)'}}>
          <RightProperty></RightProperty>  
          </Sider>
        </Layout>
      </Layout>
    </BasicStore.Provider>
  )
}