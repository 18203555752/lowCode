import React, { FC } from 'react';
import StaticTextC from '../../../components/StaticTextC/index'
interface ComponentObj {
  componentName: string,
  component: any
  config: any
}
const componentFileNames = [
  StaticTextC as unknown as ComponentObj
]

export const componentList: {[x: string]: ComponentObj} = {}
componentFileNames.forEach( (item: ComponentObj)=> {
  // const module = await import(item);
  // setMyComponent(module.default);
  console.log(item)
  componentList[item.componentName] = (item)
})

