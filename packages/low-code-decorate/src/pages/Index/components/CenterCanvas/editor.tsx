import { type FC, Suspense, useContext, useReducer, useState, useEffect } from "react"
import { componentList } from "@/pages/Index/load"
import './style/editor.less'
import { ComponentInfo } from "@/clazz/style"
import Shape from './shape/shape'
import { basicStoreConText } from "@/contexts/componentList"
import React from "react"
interface Props {
  name: string
}
const CenterCanvas:FC<Props> = ({name}) => {
  const {basicStore, dispatch} = useContext(basicStoreConText)
  const [shuldRemove, setShuldRemove] = useState(false)
  const [exitGrid, setExitGrid] = useState(false)
  const removeCurComponent = (e: React.MouseEvent)=> {
    if(!shuldRemove) return
    console.log('删除curComponent', e.currentTarget, e.target)
    dispatch({type: 'setIndex', payload: {index: null}})
    setShuldRemove(false)
  }
  /**
   * desc 从左侧组件列表拖拽至编辑器区域的事件
  */
  const handleDragOver = (e: any) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }
  /**
   * desc 从左侧组件列表拖拽至编辑器区域动作完成
  */
  const handleDrop = async (e:any) => {
    e.preventDefault()
    e.stopPropagation()
    const componentName = e.dataTransfer.getData('componentName')
    // return 
    if (componentName) {
      const listItem = componentList[componentName]
      const instance: ComponentInfo = new listItem.config()
      const EditorRectInfo = document.getElementById('editor')!.getBoundingClientRect()
      const x = e.pageX - EditorRectInfo.left
      const y = e.pageY - EditorRectInfo.top
      instance.style.setPos({left: x, top: y})
      const component = {...listItem, instance}
      // console.log(component, x,y)
      dispatch({type: 'appendComponent', payload: component})
    }
  }
  return <div id="editor" className="editor" 
    onMouseDown={()=> {setShuldRemove(true)}}
    onMouseUp={removeCurComponent}
    onDrop={handleDrop} 
    onDragOver={handleDragOver}>
      {/* 网格线 */}
      {exitGrid? <div className="grid"></div>: <></>}
      {/* 标尺 */}
      <div className="rules"></div>

      {/* 操作台组件列表 */}
      <div className="componentsList">
        {basicStore.componentData.map((item, index)=>{
          const Component = item.component;
         return (<Suspense key={item.instance!.id} fallback={<div>Loading...</div>}>
            <Shape
              setExitGrid={setExitGrid}
              id={item.instance!.id}
              index={index}
              component={item}
              styles={item.instance!.style.allStyles}>
              <Component basic={item.instance!.attr.attrs._basicAttr}></Component>
            </Shape>            
        </Suspense>)})}  
      </div>
  </div>
}

export default CenterCanvas