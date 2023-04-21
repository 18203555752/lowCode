import { ComponentObj, type BasicStore } from '@/types/basicStore';
import React, {type Dispatch} from 'react';

export const basicStoreConText = React.createContext<{basicStore: BasicStore, dispatch: any}>({
  basicStore: {
    componentData: [],
    curComponent: null,
  },
  dispatch: ()=> {}
});
