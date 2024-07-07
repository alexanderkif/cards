import { createContext, useState, ReactNode } from 'react';
import DialogComponent from '../DialogComponent/DialogComponent';

export interface DialogContextType {
  confirm: (message: string) => Promise<boolean>;
}

export const DialogContext = createContext<DialogContextType | undefined>(
  undefined
);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);
  const [resolveDialog, setResolveDialog] = useState<(value: boolean) => void>(
    () => {}
  );

  const confirm = (message: string): Promise<boolean> => {
    setDialogMessage(message);
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
        />
      )}
    </DialogContext.Provider>
  );
}
