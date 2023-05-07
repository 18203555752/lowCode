import { useEcharts } from '@/hooks/UseEcharts';
import { ComponentObj } from '@/types/basicStore';
import { FC, useEffect, useRef } from 'react';
import './index.less';

interface Props {
  basic: any,
  component: ComponentObj
}

const Map:FC<Props> = (props) => {
  const { basic, component } = props
  const chartContainer = useRef<HTMLDivElement>(null)
  const {updateChart, resizeHandle} = useEcharts(chartContainer)
  

  /**
   * desc 获取图表的配置项
   * todos: 完善基础配置项和默认值
  */
  const getOption = ()=> {
    return {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    }
  }
  useEffect(()=> {
    const option = getOption()
    //@ts-ignore
    updateChart(option)
  }, [])


  return <div ref={chartContainer} className='component'>{basic.input}</div>
}
export default Map