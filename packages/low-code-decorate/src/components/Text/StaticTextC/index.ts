

import { ComponentGroup } from '@/enums'
import React from 'react'
import StaticTextComponent, { componentName, nickName } from './config'
// import README from './README.md'

export default {
  componentName,
  group: ComponentGroup.TEXT,
  nickName,
  component: React.lazy( ()=> import('./StaticTextC') ),
  config: StaticTextComponent,
  instance: null
}
