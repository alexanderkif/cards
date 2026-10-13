import { createContext } from 'react';

export interface DialogContextType {
  confirm: (message: string, showCancel?: boolean) => Promise<boolean>;
}

export const DialogContext = createContext<DialogContextType | undefined>(
  undefined
);
