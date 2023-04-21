import { basicStoreConText } from "@/contexts/componentList"
import { type FC, Suspense, useContext, JSXElementConstructor, ReactNode } from "react"
interface Props {
  name: string
  children: ReactNode
}
const CenterCanvas:FC<Props> = ({name, children}) => {
  const {basicStore, dispatch} = useContext(basicStoreConText)

  const handle = ()=> {
    
  }
  return <div id="editor" className="editor">
      
  </div>
}

export default CenterCanvas