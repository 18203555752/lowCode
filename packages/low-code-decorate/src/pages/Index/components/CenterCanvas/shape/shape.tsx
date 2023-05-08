import { curComponentConText } from "@/contexts/componentList"
import React, { type FC, Suspense, useContext, JSXElementConstructor, ReactNode, useMemo, useState, useEffect, useRef } from "react"
import './shape.less'
import { StyleItem } from "@/clazz/type"
import { ComponentObj } from "@/types/basicStore"
interface Props {
  id: string
  children: ReactNode
  component: ComponentObj
  styles: Style
  setExitGrid: (isShow: boolean)=> void
}
interface Style{
  width: string
  height: string
  left: string
  top: string
}
const CenterCanvas:FC<Props> = ({id, children, styles, component, setExitGrid}) => {
  console.log(`${component.componentName}->shape组件render`)
  const {curComponent, dispatch} = useContext(curComponentConText)
  const [style, setStyle] = useState(styles)
  const [display, setDispaly] = useState<boolean>(false)
  const styleRef = useRef(style)
  const isCurrent = useMemo(()=> {
    console.log(`isCurrent`)
    if(curComponent) {
      return curComponent.instance!.id === component.instance!.id ? 'isCurrent' : ''
    }
    return ''
  }, [curComponent])
  const showMask = useMemo(()=> {
    return isCurrent || display ? 'block' : 'none'
  }, [isCurrent, display])
  useEffect(()=> {
    console.log('curComponent改变了！', curComponent)
    if(curComponent && curComponent.instance!.id === component.instance!.id) {
      setStyle(styles)
    }
  }, [curComponent])
  /**
   * desc鼠标拖拽事件
  */
  const handleDragendShape = (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
    e.stopPropagation()
    setExitGrid(true)
    const styleResource = component.instance!.style
    // console.log(curComponent, component.instance!.id)
    if(!curComponent || curComponent.instance!.id !== component.instance!.id) return console.log('此组件不是当前活跃组件！')

    const startX = e.clientX
    const startY = e.clientY
    let isDrag = false
    /**
     * desc 添加document对象的mousemove事件，用来实现拖拽效果
     * */ 
    const move = (e: MouseEvent)=> {
      const left = e.clientX - startX + parseInt(styleResource.left as string) + 'px'
      const top = e.clientY - startY + parseInt(styleResource.top as string) + 'px'
      styleRef.current = {
        ...style,
        left,
        top
      }
      setStyle(styleRef.current)
      isDrag = true
    }

    /**
     *desc 添加document对象的mouseup事件，并在触发后解绑这些事件 ：mousemove、mouseup
     */ 
    const up = ()=> {
      
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
      if(isDrag) {
        dispatch({ type: 'changeCurComponentStyle', payload:{left: styleRef.current.left.slice(0,-2), top: styleRef.current.top.slice(0,-2)}})
      }
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  
  /**
   * desc 设置当前组件为选中组件
  */
  const setCurComponent = (e: React.MouseEvent)=> {
    // console.log('setCurComponentsetCurComponentsetCurComponent')
    e.stopPropagation()
    e.preventDefault()
    setExitGrid(false)
    if(curComponent && curComponent.instance!.id === component.instance!.id) return
    dispatch({type: 'setCurComponent', payload: {component}})
  }

  return (
    <div
      id={'shape_'+id} 
      className={"shape" + ' ' + isCurrent}
      style={{...style}}
      onMouseDown={handleDragendShape}
      onClick={setCurComponent}
      onMouseEnter={()=> {setDispaly(true)}}
      onMouseLeave={()=> {setDispaly(false)}}
      >
        {children}
        <div className='mask' style={{display: showMask}}></div>
    </div>)
}

export default CenterCanvas
