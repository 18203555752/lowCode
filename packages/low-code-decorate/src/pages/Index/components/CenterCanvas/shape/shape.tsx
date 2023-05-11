import { basicStoreConText } from "@/contexts/componentList"
import React, { type FC, useContext, ReactNode, useMemo, useState, useEffect, useRef, useCallback } from "react"
import './shape.less'
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
  const {basicStore, dispatch} = useContext(basicStoreConText)
  const {index: curIndex} = basicStore

  const isCurrent = useMemo(()=> {
    return (curIndex === id) ? 'isCurrent' : ''
  }, [curIndex, id])
  const showMask = useMemo(()=> {
    return isCurrent ? 'block' : 'none'
  }, [isCurrent])
  useEffect(()=> {
    // if(curComponent && curComponent.instance!.id === component.instance!.id) {
    //   setStyle(styles)
    // }
  }, [curIndex])
  /**
   * @desc 鼠标拖拽事件
  */
  const handleDragendShape = (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
    e.stopPropagation()
    setExitGrid(true)
    const {left: startLeft, top: startTop} = component.instance!.style
    // console.log(curIndex, id)
    if(curIndex !== null && curIndex !== id) return console.log('此组件不是当前活跃组件！')

    const startX = e.clientX
    const startY = e.clientY
    let isDrag = false
    /**
     * @desc 添加document对象的mousemove事件，用来实现拖拽效果
     * */ 
    const move = throttle((e: MouseEvent)=> {
      const left = e.clientX - startX + parseInt(startLeft as string)
      const top = e.clientY - startY + parseInt(startTop as string)
      dispatchStyle(left, top)
      isDrag = true
    })

    /**
     * @desc 添加document对象的mouseup事件，并在触发后解绑这些事件 ：mousemove、mouseup
     */ 
    const up = ()=> {      
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  const dispatchStyle = useCallback((left: number, top: number)=> {
    dispatch({ type: 'changeCurComponentStyle', payload:{
        id: component.instance?.id,
        type: 'pos',
        style: {
          left, top
        }
      }
    })
  }, [dispatch])
  /**
   * @desc 设置当前组件为选中组件
  */
  const setCurComponent = (e: React.MouseEvent)=> {
    e.stopPropagation()
    e.preventDefault()
    setExitGrid(false)
    if(curIndex && curIndex === id) return
    dispatch({type: 'setIndex', payload: {id}})
  }

  return (
    <div
      id={'shape_'+id} 
      className={"shape" + ' ' + isCurrent}
      style={{...styles}}
      onMouseDown={handleDragendShape}
      onClick={setCurComponent}
      >
        {children}
        <div className={'mask ' + showMask}></div>
    </div>)
}

export default CenterCanvas
