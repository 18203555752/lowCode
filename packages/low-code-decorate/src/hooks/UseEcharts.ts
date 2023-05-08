import * as echarts from 'echarts'
import { useEffect } from 'react'
import mydark from './theme'
export const useEcharts = (chartEl: React.RefObject<HTMLDivElement>)=> {
  let chart: echarts.EChartsType
  echarts.registerTheme('mydark', mydark)
  useEffect(()=> {
    console.log(chartEl.current)
    chart = echarts.init(chartEl.current!, 'mydark')
    return ()=> {
      chart.clear()
      chart.dispose()
    }
  }, [])

  /**
   * desc 更新图表
  */
  const updateChart = (option: echarts.EChartsOption)=> {
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