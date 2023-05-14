import { ComponentObj } from "@/types/basicStore"
import { useEffect, useState } from "react"

const useData = (component: ComponentObj)=> {
  const [data, setData] = useState([])
  const pullData = async ()=> {
    const dataConfig = component.instance?.dataConfig
    if(dataConfig) {
      const res = await dataConfig?.requestConfig.getData()
      setData(res.data)
    }else{
      console.log('为取到数据')
    }
  }

  useEffect(()=> {
    pullData()    
  }, [])

  return {data}
}

export default useData

