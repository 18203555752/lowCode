import { basicStoreConText } from "@/contexts/componentList"
import { type FC, Suspense, useContext } from "react"
import { componentList } from "@/pages/Index/load"
import './style/editor.css'
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
  const handleDrop = async (e:any) => {
    console.log(e)
    e.preventDefault()
    e.stopPropagation()
    const componentName = e.dataTransfer.getData('componentName')
    console.log(componentName)
    // return 
    if (componentName) {
      dispatch({type: 'appendComponent', payload: componentList[componentName]})
    }
  }
  return <div id="editor" className="editor" draggable="true"  onDrop={handleDrop} onDragOver={handleDragOver}>
      {/* 网格线 */}
      <div className="grid"></div>
        <button onClick={handle}>添加组件</button>
      {/* 标尺 */}
      <div className="rules"></div>

      {/* 操作台组件列表 */}
      <div className="componentsList">
        {basicStore.componentData.map((item, index)=> <Suspense key={item.componentName+index} fallback={<div>Loading...</div>}>
            <item.component ></item.component>
        </Suspense>)}  
      </div>
  </div>
}

export default CenterCanvas