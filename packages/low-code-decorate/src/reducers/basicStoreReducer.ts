
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
        default:
            return state
    }
}

/**
 * desc 添加
 * 
*/
function appendComponent(state: BasicStore, payload: any) {
    payload.impl = new payload.config(payload.componentName)

    const componentData = [...state.componentData, payload]

    return { ...state, componentData }
}