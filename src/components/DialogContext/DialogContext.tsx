import { createContext, useState, ReactNode } from 'react';
import DialogComponent from '../DialogComponent/DialogComponent';

export interface DialogContextType {
  confirm: (message: string, showCancel?: boolean) => Promise<boolean>;
}

export const DialogContext = createContext<DialogContextType | undefined>(
  undefined
);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);
  const [isShowCancel, setIsShowCancel] = useState(true);
  const [resolveDialog, setResolveDialog] = useState<(value: boolean) => void>(
    () => {}
  );

  const confirm = (message: string, showCancel = true): Promise<boolean> => {
    setDialogMessage(message);
    setIsShowCancel(showCancel);
    return new Promise<boolean>((resolve) => {
      setResolveDialog(() => resolve);
    });
  };

  const handleOk = () => {
    if (resolveDialog) {
      resolveDialog(true);
      setDialogMessage(null);
    }
  };

  const handleCancel = () => {
    if (resolveDialog) {
      resolveDialog(false);
      setDialogMessage(null);
    }
  };

  return (
    <DialogContext.Provider value={{ confirm }}>
      {children}
      {dialogMessage && (
        <DialogComponent
          message={dialogMessage}
          onOk={handleOk}
          onCancel={handleCancel}
          showCancel={isShowCancel}
        />
      )}
    </DialogContext.Provider>
  );
}
