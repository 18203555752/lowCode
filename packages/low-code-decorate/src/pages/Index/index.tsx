// import { useState } from 'react';
import { Layout, Menu } from 'antd';
import PageHeader from '../../components/PageHeader';
import { LeftMenu } from './components/LeftMenu';
import { RightProperty } from './components/RightProperty';
import CenterCanvas  from './components/CenterCanvas';
import React, { Suspense, useState } from 'react';
import {componentList} from './loadComponents'
import {BasicStore} from '@/contexts/componentList'
console.log(componentList)
const { Header, Content, Sider } = Layout;

export const Index = () => {
  const [coms, setComs] = useState<any[]>([])
  setTimeout(()=> {
    setComs([componentList.StaticText])
  }, 2000 )
  return (
    <BasicStore.Provider value={{list: coms}}>
      <Layout style={{color: '#fff', height: '100vh'}}>
        <Header style={{background: 'rgb(33, 37, 40)'}}><PageHeader /></Header>
        <Layout style={{height: 'calc(100% - 80px)'}}>
          <Sider collapsible width={200} style={{background: 'rgb(33, 37, 40)'}}>
            sider
          </Sider>
          <Content style={{background: 'rgb(39, 46, 59)'}}>
            <CenterCanvas name='画布区域'></CenterCanvas>
            {coms.map((item)=> <Suspense fallback={<div>Loading...</div>}>
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