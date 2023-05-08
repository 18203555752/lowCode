

import { ComponentGroup } from '@/enums'
import React from 'react'
import BasicBarChartComponent, { componentName, nickName } from './config'
// import README from './README.md'

export default {
  componentName,
  group: ComponentGroup.BAR,
  nickName,
  component: React.lazy( ()=> import('./BasicBarChart') ),
  config: BasicBarChartComponent,
  instance: null
}
