import { ComponentInfo,  } from "@/clazz/style"
import { basicStoreConText } from "@/contexts/componentList"
import React, { type FC, Suspense, useContext, JSXElementConstructor, ReactNode, useMemo, useState } from "react"
import './shape.css'
import { StyleItem } from "@/clazz/type"
interface Props {
  id: string
  children: ReactNode
  info: ComponentInfo
  position: StyleItem[]
}
interface Style{
  width: string
  height: string
  left: number
  top: number
}
const CenterCanvas:FC<Props> = ({id, children, position, info}) => {
  const {basicStore, dispatch} = useContext(basicStoreConText)
  const [style, setStyle] = useState(()=> {
    return getShapeStyle(position) as Style
  })

  /**
   * desc鼠标拖拽事件
  */
  const handleDragendShape = (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
    const startX = e.clientX
    const startY = e.clientY

    /**
     * desc 添加document对象的mousemove事件，用来实现拖拽效果
     * */ 
    const move = (e: MouseEvent)=> {
      // console.log(e.clientX , startX , (position[2].val as number) )
      const left = e.clientX - startX + (position[2].val as number)
      const top = e.clientY - startY + (position[3].val as number)
      console.log(left, top , position[2].val)
      setStyle({
        ...style,
        left,
        top
      })
    }

    /**
     *desc 添加document对象的mouseup事件，并在触发后解绑这些事件 ：mousemove、mouseup
     */ 
    const up = ()=> {
      console.log('up')
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
      console.log(style)
      dispatch({ type: 'changeComponentPosition', payload:{left: style.left, top: style.top, componentName: info.name}})
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }
  return (
    <div 
      id={'shape_'+id} 
      className="shape" 
      style={{...style}}
      onMouseDown={handleDragendShape}
      >
        {children}
    </div>)
}

export default CenterCanvas

function getShapeStyle(position: StyleItem[]) {
  const styleArr = position.map((item)=> ({[item.style]: item.val}))
  let result = {}
  styleArr.forEach((item)=> {
    result = {...result, ...item}
  })
  return result
}