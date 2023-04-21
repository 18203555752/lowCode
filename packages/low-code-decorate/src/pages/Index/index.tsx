// import { useState } from 'react';
import { Layout, Menu } from 'antd';
import PageHeader from '../../components/PageHeader';
import { LeftMenu } from './components/LeftMenu';
import { RightProperty } from './components/RightProperty';
import CenterCanvas  from './components/CenterCanvas/editor';
import React, { useReducer, useState } from 'react';
import {componentList} from './load'
import {basicStoreConText} from '@/contexts/componentList'
import basicStoreReducer, {initialBasicStore} from '@/reducers/basicStoreReducer'
import { ComponentObj } from '@/types/basicStore';
console.log(componentList)
const { Header, Content, Sider } = Layout;

export const Index = () => {
  const [basicStore, dispatch] = useReducer(basicStoreReducer, initialBasicStore)
  console.log(basicStore)
  
  return (
    <basicStoreConText.Provider value={{basicStore, dispatch}}>
      <Layout style={{color: '#fff', height: '100vh'}}>
        <Header style={{background: 'rgb(33, 37, 40)'}}><PageHeader /></Header>

        <Layout style={{height: 'calc(100% - 80px)'}}>
          <Sider collapsible width={200} style={{background: 'rgb(33, 37, 40)'}}>
            <LeftMenu></LeftMenu>
          </Sider>
          <Content style={{background: 'rgb(39, 46, 59)'}}>
            <CenterCanvas name='画布区域'></CenterCanvas>            
          </Content>
          <Sider width={200} style={{background: 'rgb(33, 37, 40)'}}>
          <RightProperty></RightProperty>  
          </Sider>
        </Layout>
      </Layout>
    </basicStoreConText.Provider>
  )
}