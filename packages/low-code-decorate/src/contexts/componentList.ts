import { ComponentObj } from '@/types/basicStore';
import React from 'react';

interface BasicStore{
  componentData: ComponentObj[]
  curComponent: ComponentObj | null
}
export const BasicStore = React.createContext<BasicStore>({
  componentData: [],
  curComponent: null
});