import { initialBasicStore } from '@/reducers/basicStoreReducer';
import { BasicStore, ComponentObj } from '@/types/basicStore';
import React, {type Dispatch} from 'react';
type basicStoreAction = 'appendComponent' | 'removeComponent' | 'setIndex' | 'changeCurComponentStyle' | "changeCurComponentAttr"
export const basicStoreConText = React.createContext<{basicStore: BasicStore, dispatch: Dispatch<{type: basicStoreAction, payload: any}>}>({
  basicStore: initialBasicStore,
  dispatch: ()=> {}
});
