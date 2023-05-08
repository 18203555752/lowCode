import { ComponentObj } from '@/types/basicStore';
import StaticTextC from '../../components/Text/StaticTextC'
import DateText from '../../components/Text/DateText'
import BasicBarChart from '../../components/Chart/Bar/basicBarChart'

const componentFileNames = [
  StaticTextC,
  DateText,
  BasicBarChart
]
export const componentList: {[x: string]: ComponentObj} = {}
componentFileNames.forEach( (item: ComponentObj)=> {
  componentList[item.componentName] = (item)
})

