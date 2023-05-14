import * as echarts from 'echarts'
import { useEffect, useState } from 'react'
import mydark from './theme'
let chart: echarts.EChartsType
export const useEcharts = (chartEl: React.RefObject<HTMLDivElement>)=> {  
  echarts.registerTheme('mydark', mydark)
  const [chart, setChart] = useState<echarts.EChartsType | null>(null)
  useEffect(()=> {
    console.log(chartEl.current)
    const chart = echarts.init(chartEl.current!, 'mydark')
    setChart(chart)
    return ()=> {
      chart.clear()
      chart.dispose()
    }
  }, [])

  /**
   * desc 更新图表
  */
  const updateChart = (option: echarts.EChartsOption)=> {
    console.log(chart)
    if(!chart) return
    chart.clear()
    chart.setOption(option)
  }

  /**
   * desc 容器宽高发生变化时 resize图表
  */
  const resizeHandle = ()=> {
    const {width, height} = chartEl.current!.getBoundingClientRect()
    chart?.resize({ width, height })
  }

  return {updateChart, resizeHandle}
}