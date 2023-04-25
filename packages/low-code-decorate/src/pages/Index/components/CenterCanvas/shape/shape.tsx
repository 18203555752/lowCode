import { curComponentConText } from "@/contexts/componentList"
import React, { type FC, Suspense, useContext, JSXElementConstructor, ReactNode, useMemo, useState } from "react"
import './shape.less'
import { StyleItem } from "@/clazz/type"
import { ComponentObj } from "@/types/basicStore"
interface Props {
  id: string
  children: ReactNode
  component: ComponentObj
  styles: Style
}
interface Style{
  width: string
  height: string
  left: string
  top: string
}
const CenterCanvas:FC<Props> = ({id, children, styles, component}) => {
  const {curComponent, dispatch} = useContext(curComponentConText)
  const [style, setStyle] = useState(styles)
  const [display, setDispaly] = useState('none')
  const isCurrent = useMemo(()=> {
    if(curComponent) {
      return curComponent.instance!.id === component.instance!.id ? 'isCurrent' : ''
    }
    return ''
  }, [curComponent])
  /**
   * desc鼠标拖拽事件
  */
  const handleDragendShape = (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
    e.stopPropagation()
    console.log(curComponent, component.instance!.id)
    if(!curComponent || curComponent.instance!.id !== component.instance!.id) return console.log('此组件不是当前活跃组件！')

    const startX = e.clientX
    const startY = e.clientY

    /**
     * desc 添加document对象的mousemove事件，用来实现拖拽效果
     * */ 
    const move = (e: MouseEvent)=> {
      const left = e.clientX - startX + parseInt(style.left.slice(0,-2)) + 'px'
      const top = e.clientY - startY + parseInt(style.top.slice(0,-2)) + 'px'
      // console.log( style)
      setStyle({
        ...style,
        // @ts-ignore
        left,
        // @ts-ignore
        top
      })
    }

    /**
     *desc 添加document对象的mouseup事件，并在触发后解绑这些事件 ：mousemove、mouseup
     */ 
    const up = ()=> {
      console.log('mouseupmouseupmouseupmouseupmouseup')
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
      dispatch({ type: 'changeCurComponentStyle', payload:{left: style.left.slice(0,-2), top: style.top.slice(0,-2)}})
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  
  /**
   * desc 设置当前组件为选中组件
  */
  const setCurComponent = (e: React.MouseEvent)=> {
    e.stopPropagation()
    e.preventDefault()
    dispatch({type: 'setCurComponent', payload: {component}})
  }

  const maskShow = ()=> {
    setDispaly('block')
  }
  const maskHide = ()=> {
    setDispaly('none')
  }
  return (
    <div 
      id={'shape_'+id} 
      className={"shape" + ' ' + isCurrent}
      style={{...style}}
      onMouseDown={handleDragendShape}
      onClick={setCurComponent}
      onMouseEnter={maskShow}
      onMouseLeave={maskHide}
      >
        {children}
        <div className='mask' style={{display}}></div>
    </div>)
}

export default CenterCanvas
