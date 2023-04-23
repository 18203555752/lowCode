import { BaseComponent } from "@/clazz/style"
import { Dispatch } from "react"

export interface BasicStore{
  componentData: ComponentObj[]
  curComponent: ComponentObj | null
}

export interface ComponentObj {
  componentName: string,
  component: any
  config: any
  instance: BaseComponent | null
}

export interface Action{
  type: string, 
  payload: any
}

export type DispatchF = Dispatch<{type: string, payload: any}>