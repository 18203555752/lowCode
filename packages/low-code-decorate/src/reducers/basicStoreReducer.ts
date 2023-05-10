
import { ComponentInfo } from '@/clazz/style';
import { ComponentObj, BasicStore } from '@/types/basicStore';

export const initialBasicStore: BasicStore = {
  index: null,
  componentData: []
}

export default (state: BasicStore, action: { type: string, payload: any }) => {
  const { type, payload } = action
  switch (type) {
    case 'appendComponent':
      return appendComponent(state, payload)
    case 'removeComponent':
      return removeComponent(state, payload)
    case 'setIndex':
      return {
        index: payload.id,
        componentData: state.componentData
      }
    case 'changeCurComponentStyle':
      return changeCurComponentStyle(state, payload)
    case 'changeCurComponentAttr':
      return changeCurComponentAttr(state!, payload);
    default:
      return state
  }
}

/**
 * desc 添加组件
*/
function appendComponent(state: BasicStore, payload: any) {
  state.componentData.push(payload)
  return {
    index: state.index,
    componentData: state.componentData
  }
}

/**
 * desc 删除组件
*/
function removeComponent(state: BasicStore, payload: any) {
  const componentData = state.componentData.filter((component) => component.instance?.id !== payload.id)
  return {
    index: state.index,
    componentData: componentData
  }
}

/**
 * desc 修改当前选中组件的style
*/
function changeCurComponentStyle(state: BasicStore, payload: any) {

  const component = state.componentData.find((component) => component.instance?.id === state.index)
  if (!component) return state
  if (payload.type === 'font') {
    component!.instance!.style.setFont(payload.style)

  } else {
    component!.instance!.style.setPos(payload.style)
  }

  return {
    index: state.index,
    componentData:[...state.componentData]
  }
}

function changeCurComponentAttr(state: BasicStore, payload: any) {
  const component = state.componentData.find((component) => component.instance?.id === payload.id)
  component?.instance?.attr.setAttr(payload.type, payload)
  // console.log(state)
  // if (payload.type == 'font') {
  //     state!.instance!.attr.setAttr(payload)

  // } else {
  //     state!.instance!.style.setPos(payload)

  // }

return {
    index: state.index,
    componentData: state.componentData
  }
}
