
import { ComponentInfo } from '@/clazz/style';
import { ComponentObj, BasicStore } from '@/types/basicStore';

export const initialBasicStore = {
    componentData: [],
    curComponent: null
}

export default (state: BasicStore, action: { type: string, payload: any }) => {
    const { type, payload } = action
    switch (type) {
        case 'appendComponent':
            return appendComponent(state, payload)

        case 'setCurComponent':

            return { ...state, curComponent: payload }

        case 'changeComponentPosition': 
            return changeComponentPosition(state, payload)
            
        default:
            return state
    }
}

/**
 * desc 添加组件
 * 
*/
function appendComponent(state: BasicStore, payload: any) {
    
    const componentData: ComponentObj[] = [...state.componentData, payload]
    return { ...state, componentData }
}

/**
 *  desc 改变curComponent的 位置宽高等信息 positionStyle 
 */ 

function changeComponentPosition(state: BasicStore, payload: any) {
    const curComponent = state.componentData.find((component)=> component.componentName === payload.componentName )
    Object.keys(payload).forEach((item)=> {
        if(item === payload[item].componentName) return
        // curComponent!.instance!.style.(item, payload[item])

    })
    console.log(state)
    return { ...state }
}