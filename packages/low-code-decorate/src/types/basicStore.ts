import { ComponentInfo } from "@/clazz/style"
import { ComponentGroup } from "@/enums"
import { Dispatch } from "react"

export type BasicStore = {
  index: number | null
  componentData: ComponentObj[]
}

export interface ComponentObj {
  componentName: string
  group: ComponentGroup
  nickName: string
  component: any
  config: any
  instance: ComponentInfo | null
}

export interface Action{
  type: string, 
  payload: any
}

export type DispatchF = Dispatch<{type: string, payload: any}>