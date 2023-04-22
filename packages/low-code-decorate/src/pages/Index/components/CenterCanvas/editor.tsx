import { basicStoreConText } from "@/contexts/componentList"
import { type FC, Suspense, useContext } from "react"
import { componentList } from "@/pages/Index/load"
import './style/editor.css'
import { BaseComponent } from "@/clazz/style"
import Shape from './shape/shape'
interface Props {
  name: string
}
const CenterCanvas:FC<Props> = ({name}) => {
  const {basicStore, dispatch} = useContext(basicStoreConText)

  const handle = ()=> {
    
  }
  const handleDragOver = (e: any) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }
  /**
   * desc 从左侧组件列表拖拽至编辑器区域动作完成
  */
  const handleDrop = async (e:any) => {
    // console.log(e)
    e.preventDefault()
    e.stopPropagation()
    const componentName = e.dataTransfer.getData('componentName')
    // return 
    if (componentName) {
      const listItem = componentList[componentName]
      const instance: BaseComponent = new listItem.config()
      const EditorRectInfo = document.getElementById('editor')!.getBoundingClientRect()
      const x = e.pageX - EditorRectInfo.left
      const y = e.pageY - EditorRectInfo.top
      instance.setPosition('left', x)
      instance.setPosition('top', y)
      const component = {...listItem, instance}
      console.log(component)
      dispatch({type: 'appendComponent', payload: component})
    }
  }
  return <div id="editor" className="editor"  onDrop={handleDrop} onDragOver={handleDragOver}>
      {/* 网格线 */}
      <div className="grid"></div>
      {/* 标尺 */}
      <div className="rules"></div>

      {/* 操作台组件列表 */}
      <div className="componentsList">
        {basicStore.componentData.map((item, index)=> <Suspense key={item.instance!.id} fallback={<div>Loading...</div>}>
            <Shape 
              id={item.instance!.id}
              info={item.instance!}
              position={item.instance!.position}>
              <item.component ></item.component>
            </Shape>            
        </Suspense>)}  
      </div>
  </div>
}

export default CenterCanvas