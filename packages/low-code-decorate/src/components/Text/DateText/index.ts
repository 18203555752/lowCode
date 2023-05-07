

import { ComponentGroup } from '@/enums'
import React from 'react'
import DateTextComponent, { componentName, nickName } from './config'
// import README from './README.md'

export default {
  componentName,
  group: ComponentGroup.TEXT,
  nickName,
  component: React.lazy( ()=> import('./DateText') ),
  config: DateTextComponent,
  instance: null
}
