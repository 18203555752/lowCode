import { AttrObj } from '@/clazz/style';
import { useEcharts } from '@/hooks/useEcharts';
import useData from '@/hooks/useData';
import { ComponentObj } from '@/types/basicStore';
import { BarSeriesOption, EChartsOption } from 'echarts';
import { FC, useEffect, useRef } from 'react';
import './index.less';
import { urlToHttpOptions } from 'url';
import { compareResetValue } from '@/utils/compareReaetValue';

interface Props {
  basic: any,
  component: ComponentObj
}
interface Attr{
  _publicAttr: AttrObj
  _basicAttr: AttrObj
  _dataAttr: AttrObj
  _labelAttr: AttrObj
  _axisAttr: AttrObj
}
const Map:FC<Props> = (props) => {
  const { basic, component } = props
  const chartContainer = useRef<HTMLDivElement>(null)
  const {updateChart, resizeHandle} = useEcharts(chartContainer)
  
  const {data} = useData(component)
  const {_axisAttr, _dataAttr, _labelAttr } = component.instance?.attr! as unknown as Attr
  // console.log(component.instance)
  /**
   * @desc 获取图表的配置项
   * todos: 完善基础配置项和默认值
  */
  const getOption = ()=> {
    const option: EChartsOption = {
      grid: {
        top: '10%',
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: [],
        splitLine: {
          show: _axisAttr.xMeshShow!.val as boolean,
          lineStyle: {
            type: 'dotted',
            color: _axisAttr.axisColor!.val as string
          }
        },
        axisLine: {
          lineStyle: {
            color: _axisAttr.axisColor!.val as string || '#fff'
          }
        },
        axisTick: {
          lineStyle: {
            color: _axisAttr.axisColor!.val as string || '#fff'
          }
        },
        axisLabel: {
          color: _labelAttr.labelColor!.val as string || '#fff'
        }
      },
      yAxis: {
        type: 'value',
        max: (value) => {
          console.log(value)
          if (!Number(_dataAttr.maxVal!.val)) {
            return value.max + Number(_dataAttr.maxOffset?.val || 0)
          } else {
            return Number(_dataAttr.maxVal!.val) + Number(_dataAttr.maxOffset?.val || 0)
          }
        },
        min: (value) => {
          if (_dataAttr.minVal!.val === 'dataMin') {
            console.log(value.min - Number(_dataAttr.minOffset?.val || 0))
            return value.min - Number(_dataAttr.minOffset?.val || 0)
          } else if ((['', undefined, null] as any).includes(_dataAttr.minVal!.val)) {
            console.log(0 - Number(_dataAttr.minOffset!.val || 0))
            return 0 - Number(_dataAttr.minOffset!.val || 0)
          } else {
            console.log(Number(_dataAttr.maxVal!.val) - Number(_dataAttr.minOffset!.val || 0))
            return Number(_dataAttr.minVal!.val) - Number(_dataAttr.minOffset!.val || 0)
          }
        },
        splitLine: {
          show: _axisAttr.yMeshShow!.val as boolean,
          lineStyle: {
            type: 'dashed',
            color: _axisAttr.axisColor!.val as string
          }
        },
        axisLine: {
          lineStyle: {
            color: _axisAttr.axisColor!.val as string || '#fff'
          }
        },
        axisTick: {
          lineStyle: {
            color: _axisAttr.axisColor!.val as string || '#fff'
          }
        },
        axisLabel: {
          color: _labelAttr.labelColor!.val as string || '#fff'
        }
      },
      series: []
    }
    let series: BarSeriesOption[] = [
      {
        data: [],
        type: 'bar'
      }
    ]
    option.series = series
    return option as EChartsOption
  }

  useEffect(()=> {
    //@ts-ignore
    updateData(data)
  }, [_axisAttr, _dataAttr, _labelAttr, data])

  /**
   * @desc 图表数据首次获取或更新后的handle
   * */ 
  const updateData = (data: {label: string, value: number}[])=> {
    const option = getOption()
    const upLimit = _dataAttr.upLimit?.val
    const downLimit = _dataAttr.downLimit?.val

    const series: BarSeriesOption[] = [
      {
        type: 'bar',
        data: data.map((item)=> compareResetValue(item.value, upLimit as number, downLimit as number))
      }
    ]
    const labels = data.map((item)=> item.label)
    option.xAxis = {
      ...option.xAxis,
      // @ts-ignore
      data: labels
    }
    option.series = series
    updateChart(option)
    console.log('----------->', option)
  }
  return <div ref={chartContainer} className='component'>{basic.input}</div>
}
export default Map