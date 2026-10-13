import { useRef, useState, ReactNode } from 'react';
import DialogComponent from '../DialogComponent/DialogComponent';
import { DialogContext } from './DialogContextValue';

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);
  const [isShowCancel, setIsShowCancel] = useState(true);
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = (message: string, showCancel = true): Promise<boolean> => {
    setDialogMessage(message);
    setIsShowCancel(showCancel);
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
    });
  };

  const handleOk = () => {
    resolveRef.current?.(true);
    resolveRef.current = null;
    setDialogMessage(null);
  };

  const handleCancel = () => {
    resolveRef.current?.(false);
    resolveRef.current = null;
    setDialogMessage(null);
  };

  return (
    <DialogContext value={{ confirm }}>
      {children}
      {dialogMessage && (
        <DialogComponent
          message={dialogMessage}
          onOk={handleOk}
          onCancel={handleCancel}
          showCancel={isShowCancel}
        />
      )}
    </DialogContext>
  );
}
