import { basicStoreConText } from "@/contexts/componentList"
import React, { type FC, Suspense, useContext, JSXElementConstructor, ReactNode, useMemo, useState, useEffect, useRef } from "react"
import './shape.less'
import { StyleItem } from "@/clazz/type"
import { ComponentObj } from "@/types/basicStore"
import { throttle } from "@/utils/throttle"
interface Props {
  id: string
  children: ReactNode
  component: ComponentObj
  styles: Style
  index: number
  setExitGrid: (isShow: boolean)=> void
}
interface Style{
  width: string
  height: string
  left: string
  top: string
}
const CenterCanvas:FC<Props> = ({id, index, children, styles, component, setExitGrid}) => {
  // console.log(`${component.componentName}->shape组件render`)
  const {basicStore, dispatch} = useContext(basicStoreConText)
  const {index: curIndex} = basicStore
  const [style, setStyle] = useState(styles)
  const [display, setDispaly] = useState<boolean>(false)
  const styleRef = useRef(style)
  const isCurrent = useMemo(()=> {
    return (curIndex === index) ? 'isCurrent' : ''
  }, [curIndex, index])
  const showMask = useMemo(()=> {
    return isCurrent || display ? 'block' : 'none'
  }, [isCurrent, display])
  useEffect(()=> {
    console.log('curComponent改变了！', curIndex)
    // if(curComponent && curComponent.instance!.id === component.instance!.id) {
    //   setStyle(styles)
    // }
  }, [curIndex])
  /**
   * desc鼠标拖拽事件
  */
  const handleDragendShape = (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
    e.stopPropagation()
    setExitGrid(true)
    const {left: startLeft, top: startTop} = component.instance!.style
    console.log(curIndex, index)
    if(curIndex !== null && curIndex !== index) return console.log('此组件不是当前活跃组件！')

    const startX = e.clientX
    const startY = e.clientY
    let isDrag = false
    /**
     * desc 添加document对象的mousemove事件，用来实现拖拽效果
     * */ 
    const move = throttle((e: MouseEvent)=> {
      const left = e.clientX - startX + parseInt(startLeft as string) + 'px'
      const top = e.clientY - startY + parseInt(startTop as string) + 'px'
      console.log(e.clientX , startX , parseInt(startLeft as string))
      console.log(e.clientY, startY , parseInt(startTop as string))
      console.log(left, top)
      styleRef.current = {
        ...style,
        left,
        top
      }
      setStyle(styleRef.current)
      isDrag = true
    })

    /**
     *desc 添加document对象的mouseup事件，并在触发后解绑这些事件 ：mousemove、mouseup
     */ 
    const up = ()=> {
      
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
      if(isDrag) {
        requestAnimationFrame(()=> {
          dispatch({ type: 'changeCurComponentStyle', payload:{
            id: component.instance?.id,
            type: 'pos',
            style: {
              left: styleRef.current.left.slice(0,-2), top: styleRef.current.top.slice(0,-2)}
            }
          })
        })        
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
    if(curIndex && curIndex === index) return
    dispatch({type: 'setIndex', payload: {index}})
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
